import { Result } from '../common/Result';
import { validateEmailAddress } from '../utils/validateEmailAddress';

export interface IEmailAddress {
  email: string;
}

export class EmailAdress implements IEmailAddress {
  public email: string;

  private constructor(props: IEmailAddress) {
    this.email = props.email;
  }

  public static create(email: string): Result<EmailAdress> {
    if (!validateEmailAddress(email)) {
      return Result.fail<EmailAdress>(`Email addres ${email} is not valid.`);
    }
    return Result.ok<EmailAdress>(new EmailAdress({ email }));
  }
}
