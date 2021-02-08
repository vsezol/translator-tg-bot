import { Base64 } from 'js-base64';
import * as path from 'path';
import * as uuid from 'uuid';

import appConfig from './app.config';
import { removeFile } from './remove';
import { saveBufferAsFile } from './save';

export function* createEncodeManager(path: string, buffer: Buffer): any {
  yield saveBufferAsFile(path, buffer);
  yield removeFile(path);
}

export function getEncodedBufferFromText(text: string): Buffer {
  const encodedText = Base64.encode(text);
  const buffer = Buffer.from(encodedText, 'base64');
  return buffer;
}

export function generatePathForEncodedFile(): string {
  return path.resolve(appConfig.tempFilesPath, `${uuid.v1()}.fuck`);
}
