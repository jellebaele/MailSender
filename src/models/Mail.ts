import { Result } from '../common/Result';
import { EmailAddress } from './EmailAddress';

export interface IMail {
  sourceAddress: EmailAddress;
  destinationAddress: EmailAddress;
  subject: string;
  body: string;
  replyToAddress?: string;
}

export class Mail implements IMail {
  public sourceAddress: EmailAddress;
  public destinationAddress: EmailAddress;
  public subject: string;
  public body: string;
  public replyToAddress?: string;

  private constructor(props: IMail) {
    this.sourceAddress = props.sourceAddress;
    this.destinationAddress = props.destinationAddress;
    this.subject = props.subject;
    this.body = props.body;
    this.replyToAddress = props.replyToAddress;
  }

  public static create(props: IMail): Result<Mail> {
    return Result.ok<Mail>(new Mail(props));
  }
}
