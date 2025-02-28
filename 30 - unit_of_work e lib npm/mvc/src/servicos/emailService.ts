import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';

dotenv.config(); // Carrega as variáveis do .env

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail(to: string, subject: string, html: string) {
    const msg = {
        to,
        from: process.env.SENDGRID_FROM_EMAIL!, // Email verificado no SendGrid
        subject,
        html
    };

    try {
        await sgMail.send(msg);
        console.log('E-mail enviado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}
