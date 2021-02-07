import { Base64 } from 'js-base64';
import * as path from 'path';
import * as uuid from 'uuid';

import appConfig from './app.config';
import { removeFile } from './remove';
import { saveBufferAsFile } from './save';

export function* createEncodeManager(text: string): any {
  const path = getPath();
  
  const buffer = getEncodedBufferFromText(text);
  yield saveBufferAsFile(path, buffer)
    .then(() => path)
    .catch((error) => {
      throw error;
    });

  yield removeFile(path);
}



function getEncodedBufferFromText(text: string): Buffer {
  const encodedText = Base64.encode(text);
  const buffer = Buffer.from(encodedText, 'base64');
  return buffer;
}

function getPath(): string {
  return path.resolve(appConfig.tempFilesPath, `${uuid.v1()}.fuck`);
}
