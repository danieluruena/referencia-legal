import { z } from 'zod'

interface Env {
  VITE_RESEND_API_KEY: string;
  VITE_TURNSTILE_SECRET_KEY: string;
}

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
  turnstileToken: string;
}

const ContactFormDataSchema = z.object({
  name: z.string()
    .min(2, 'El nombre es obligatorio')
    .max(100),
  phone: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .max(15),
  email: z.email('Correo inválido'),
  message: z.string()
    .min(10, 'El mensaje es demasiado corto')
    .max(5000),
  turnstileToken: z.string().min(1),
})

interface TurnstileResponse {
  success: boolean;
  challenge_ts: string;
  hostname: string;
  'error-codes'?: string[];
}

const validateTurnstileToken = async (token: string, secretKey: string): Promise<boolean> => {
  try {
    const varificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: secretKey,
        response: token,
      }),
    })

    const data = await varificationResponse.json<TurnstileResponse>()
    return data.success
  } catch (error) {
    console.error('Error al validar el token de Turnstile:', error)
    return false
  }
}

const sanitizeFormData = (data: unknown): ContactFormData => {
  const validationResult = ContactFormDataSchema.safeParse(data)
  if (!validationResult.success) {
    console.error('Errores de validación del formulario:', validationResult.error.format())
    throw new Error('Datos del formulario no válidos')
  }

  return {
    name: validationResult.data.name.trim(),
    phone: validationResult.data.phone.trim(),
    email: validationResult.data.email.trim(),
    message: validationResult.data.message.trim(),
    turnstileToken: validationResult.data.turnstileToken,
  }
}

export const onRequestPost = async (context: EventContext<Env, string, unknown>) => {
  try {
    const { request, env } = context
  
    const resendApiKey = env.VITE_RESEND_API_KEY || ''
    const turnstileSecret = env.VITE_TURNSTILE_SECRET_KEY || ''
    if (!resendApiKey || !turnstileSecret) {
      console.error('Faltan variables de entorno para el formulario de contacto')
      return Response.json({
        success: false,
        error: 'El servicio de contacto no está configurado',
      }, { status: 500 })
    }

    let requestData: unknown
    try {
      requestData = await request.json()
    } catch (error) {
      console.error('El cuerpo de la solicitud no contiene JSON válido:', error)
      return Response.json({
        success: false,
        error: 'Solicitud no válida',
      }, { status: 400 })
    }

    let contactFormData: ContactFormData
    try {
      contactFormData = sanitizeFormData(requestData)
    } catch (error) {
      console.error('Datos de contacto no válidos:', error)
      return Response.json({
        success: false,
        error: 'Datos del formulario no válidos: ' + JSON.stringify(error),
      }, { status: 400 })
    }

    const isTokenValid = await validateTurnstileToken(contactFormData.turnstileToken, turnstileSecret)

    if (!isTokenValid) {
      console.error('Token de Turnstile no válido')
      return Response.json({
        success: false,
        error: 'Token de Turnstile no válido',
      }, { status: 400 })
    }
  
    const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Contacto <onboarding@resend.dev>',
          to: 'dennis14756@gmail.com',
          subject: 'Nuevo mensaje del formulario',
          html: `
            <h2>Nuevo contacto</h2>
            <p><strong>Nombre:</strong> ${contactFormData.name}</p>
            <p><strong>Teléfono:</strong> ${contactFormData.phone}</p>
            <p><strong>Email:</strong> ${contactFormData.email}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${contactFormData.message}</p>
          `,
        }),
      })
  
      const data = await response.json()

      if (!response.ok) {
        console.error('Resend rechazó el correo:', response.status, data)
        return Response.json({
          success: false,
          error: 'No se pudo enviar el correo',
        }, { status: 502 })
      }
  
      return Response.json({
        success: true,
        data,
      })
  }
  catch (error) {
    console.error('Error al enviar el mensaje:', error)
    return Response.json({
      success: false,
      error: 'Error al enviar el mensaje',
    }, { status: 500 })
  }
}