export class MnemonicError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MnemonicError";
  }
}

export class UnexpectedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "UnexpectedError";
  }
}
