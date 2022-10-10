import { Result } from '../common/Result';
import { validateEmailAddress } from '../utils/validateEmailAddress';

export interface IEmailAddress {
  email: string;
}

export class EmailAddress implements IEmailAddress {
  public email: string;

  private constructor(props: IEmailAddress) {
    this.email = props.email;
  }

  public static create(email: string): Result<EmailAddress> {
    if (!validateEmailAddress(email)) {
      return Result.fail<EmailAddress>(`Email addres ${email} is not valid.`);
    }
    return Result.ok<EmailAddress>(new EmailAddress({ email }));
  }
}
