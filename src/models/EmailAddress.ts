import { Result } from '../common/Result';

export interface IEmailAddress {
  email: string;
}

export class EmailAdress implements IEmailAddress {
  public email: string;

  private constructor(props: IEmailAddress) {
    this.email = props.email;
  }

  public static create(email: string): Result<EmailAdress> {
    return Result.ok<EmailAdress>(new EmailAdress({ email }));
  }
}
