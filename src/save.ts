import { Canvas } from 'canvas';
import * as fs from 'fs';

export async function saveBufferAsFile(path: string, buffer: Buffer) {
  try {
    await fs.promises.writeFile(path, buffer);
  } catch (err) {
    throw err;
  }
}

export async function saveImage(path: string, canvas: Canvas) {
  const out = fs.createWriteStream(path);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  return new Promise((res, rej) => {
    out.on('finish', () => res('luck'));
    out.on('error', () => rej('fail'));
  });
}
