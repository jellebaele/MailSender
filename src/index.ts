import { EmailAddress } from './models/EmailAddress';
import { Mail } from './models/Mail';
import { NodemailerEmailService } from './services/NodemailerEmailService';

async function main() {
  try {
    const nodeMailerTransporter =
      await NodemailerEmailService.createTransporter({
        host: 'smtp-relay.sendinblue.com',
        port: 587,
        userName: 'jellebaele@hotmail.com',
        password: 'xxxx',
        secure: false
      });
    const mailer = new NodemailerEmailService(nodeMailerTransporter);
    console.log('Started');

    const sourceAddressOrError = EmailAddress.create('jellebaele@hotmail.com');
    const destinationAddressOrError = EmailAddress.create(
      'jellebaele@hotmail.com'
    );
    const sourceAddress = sourceAddressOrError.getValue();
    const destinationAddress = destinationAddressOrError.getValue();

    const mailOrError = Mail.create({
      sourceAddress,
      destinationAddress,
      subject: 'Hello world!',
      body: "This is an email I'm sending."
    });

    const mail = mailOrError.getValue();

    const result = await mailer.sendMail(mail);
    console.log(result);
  } catch (err) {
    console.log(err);
  }
}

main();
