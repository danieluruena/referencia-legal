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

// interface TurnstileResponse {
//   success: boolean;
//   challenge_ts: string;
//   hostname: string;
//   'error-codes'?: string[];
// }

// const validateTurnstileToken = async (token: string, secretKey: string): Promise<boolean> => {
//   try {
//     const varificationResponse = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
//       body: new URLSearchParams({
//         secret: secretKey,
//         response: token,
//       }),
//     })

//     const data = await varificationResponse.json<TurnstileResponse>()
//     return data.success
//   } catch (error) {
//     console.error('Error al validar el token de Turnstile:', error)
//     return false
//   }
// }

const sanitizeFormData = (data: ContactFormData): ContactFormData => {
  const validationResult = ContactFormDataSchema.safeParse(data)
  if (!validationResult.success) {
    console.error('Errores de validación del formulario:', validationResult.error.format())
    throw new Error('Datos del formulario no válidos')
  }

  return {
    name: data.name.trim(),
    phone: data.phone.trim(),
    email: data.email.trim(),
    message: data.message.trim(),
    turnstileToken: data.turnstileToken,
  }
}

export const onRequestPost = async (context: EventContext<Env, string, unknown>) => {
  try {
    const { request, env } = context
  
    const resendApiKey = env.VITE_RESEND_API_KEY || ''
    const turnstileSecret = env.VITE_TURNSTILE_SECRET_KEY || ''
    const contactFormData = sanitizeFormData(await request.json<ContactFormData>())

    // const isTokenValid = await validateTurnstileToken(contactFormData.turnstileToken, turnstileSecret)

    // if (!isTokenValid) {
    //   console.error('Token de Turnstile no válido')
    //   return Response.json({
    //     success: false,
    //     error: 'Token de Turnstile no válido',
    //   }, { status: 400 })
    // }
  
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