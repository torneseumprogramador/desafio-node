import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY!)

export default class SendgridService {
  static async sendEmail(to: string, subject: string, html: string, from?: string) {
    const msg = {
      to,
      from: from || process.env.SENDGRID_EMAIL!,
      subject,
      html,
    }

    await sgMail.send(msg)
  }
} 