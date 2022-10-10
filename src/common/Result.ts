export class Result<T> {
  public isSuccess: boolean;
  public isFailure: boolean;
  public error: string;
  private _value: T;

  private constructor(isSucces: boolean, error?: string, value?: T) {
    if (isSucces && error) {
      throw new Error(
        'InvalidOperationError: A result cannot be succesful and contain an error'
      );
    }

    if (!isSucces && !error) {
      throw new Error(
        'InvalidOperationError: A failing result needs to contain an error message'
      );
    }

    this.isSuccess = isSucces;
    this.isFailure = !isSucces;
    this._value = value;
    this.error = error;

    Object.freeze(this);
  }

  public getValue(): T {
    if (!this.isSuccess) {
      console.log(this.error);
      throw new Error(`Cant retrieve the value from a failed result.`);
    }

    return this._value;
  }

  public static ok<U>(value: U): Result<U> {
    return new Result<U>(true, undefined, value);
  }

  public static fail<U>(error: string): Result<U> {
    return new Result(false, error);
  }
}
