import * as fs from 'fs';
import { Canvas } from 'canvas';
import { SavingError } from './Error';

export default class SaverImage {
  static async save(path: string, canvas: Canvas) {
    const out = fs.createWriteStream(path);
    const stream = canvas.createPNGStream();
    stream.pipe(out);

    return new Promise((res, rej) => {
      out.on('finish', () => res('luck'));
      out.on('error', () =>
        rej(new SavingError(`Error while saving image.`, path))
      );
    });
  }
}
