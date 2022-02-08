import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async passwordReset(user: User, token: string, subject: any, host1: any) {
    const url = `${host1}/${user.userid}/${token}`;
    return await this.mailerService.sendMail({
      to: user.email,

      subject: subject,
      template: '/confirmation',

      context: {
        name: user.email,
        url,
      },
    });
  }

  async sendEmail(sendTo: string, temp: string, data: any = {}, subject: any) {
    await this.mailerService.sendMail({
      to: sendTo,
      subject: subject,
      template: `./${temp}`,

      context: {
        emailData: data,
      },
    });
  }
}
