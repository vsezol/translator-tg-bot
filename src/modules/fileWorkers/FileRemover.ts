import * as fs from 'fs';
import { RemovingError } from '@/modules/errors';

export default class FileRemover {
  static async remove(path: string) {
    try {
      await fs.promises.unlink(path);
    } catch (err) {
      throw new RemovingError('Error while remove file', path);
    }
  }
}
