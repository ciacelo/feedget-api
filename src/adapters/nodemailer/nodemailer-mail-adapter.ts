import { MailAdapter, SendMailData } from "../mail-adapter"
import nodemailer from 'nodemailer'


const  transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "5cffc799751926",
    pass: "149f450ec04824"
  }
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body}: SendMailData) {
  await transport.sendMail({
    from: 'Equipe Feedget <oi@feedget.com>',
    to: 'Marcelo Jr <ciacelojr@gmail.com>',
    subject,
    html: body
  })
  }
}