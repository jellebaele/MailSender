import nodemailer from 'nodemailer';
import { IMail } from '../models/Mail';
import { IMailService, IMailTransmissionResult } from '../models/MailService';
import { ITransporterConfig } from './ITransporterConfig';

export class NodemailerEmailService implements IMailService {
  private transporter: nodemailer.Transporter;

  constructor(transporter: nodemailer.Transporter) {
    this.transporter = transporter;
  }

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // https://nodemailer.com/about/
  public static async createTestTransporter(): Promise<nodemailer.Transporter> {
    const testAccount = await nodemailer.createTestAccount();

    return nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass // generated ethereal password
      }
    });
  }

  public static async createTransporter(
    transporterConfig: ITransporterConfig
  ): Promise<nodemailer.Transporter> {
    return nodemailer.createTransport({
      host: transporterConfig.host,
      port: transporterConfig.port,
      secure: transporterConfig.secure, // upgrade later with STARTTLS
      auth: {
        user: transporterConfig.userName,
        pass: transporterConfig.password
      }
    });
  }

  async sendMail(mail: IMail): Promise<IMailTransmissionResult> {
    try {
      const info = this.transporter.sendMail({
        from: mail.sourceAddress.email,
        to: mail.destinationAddress.email,
        subject: mail.subject,
        text: mail.body
      });
      return { message: `Message sent: ${info}`, success: true };
    } catch (error) {
      return { message: error.toString(), success: false };
    }
  }
}
