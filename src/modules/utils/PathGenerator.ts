import * as path from 'path';
import * as uuid from 'uuid';

import appConfig from '@/app.config';

export default class PathGenerator {
  static generatePathForEncodedFile(): string {
    const generatedPath = path.resolve(
      appConfig.tempFilesPath,
      `${uuid.v1()}.${appConfig.encoded.fileExtension}`
    );
    return generatedPath;
  }
}
