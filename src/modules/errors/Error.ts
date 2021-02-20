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

export class SendingError extends FileError {
  chatId: string | number;
  constructor(message: string, filePath: string, chatId: string | number) {
    super('SendingError', message, filePath);
    this.chatId = chatId;
  }
}

export class DownloadingError extends Error {
  url: string;

  constructor(message: string, url: string) {
    super(message);
    this.name = 'DownloadingError';
    this.url = url;
  }
}

export class DrawingImageError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DrawingImageError';
  }
}
