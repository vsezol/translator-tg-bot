export class SavingError extends Error {
  filePath: string;

  constructor(message: string, filePath: string) {
    super(message);
    this.name = 'SavingError';
    this.filePath = filePath;
  }
}

export class RemoveError extends Error {
  filePath: string;

  constructor(message: string, filePath: string) {
    super(message);
    this.name = 'RemoveError';
    this.filePath = filePath;
  }
}
