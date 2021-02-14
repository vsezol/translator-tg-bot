import * as fs from 'fs';
import { RemoveError } from './Error';

export default class RemoverFile {
  static async remove(path: string) {
    try {
      await fs.promises.unlink(path);
    } catch (err) {
      throw new RemoveError('Error while remove file', path);
    }
  }
}
