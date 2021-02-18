export class FileError extends Error {
  filePath: string;

  constructor(name: string, message: string, filePath: string) {
    super(message);
    this.name = name;
    this.filePath = filePath;
  }
}

export class RemovingError extends FileError {
  constructor(message: string, filePath: string) {
    super('RemovingError', message, filePath);
  }
}

export class SavingError extends FileError {
  constructor(message: string, filePath: string) {
    super('SavingError', message, filePath);
  }
}
