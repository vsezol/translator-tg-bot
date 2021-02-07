import * as fs from 'fs/promises';

export async function saveBufferAsFile(path: string, buffer: Buffer) {
  try {
    await fs.writeFile(path, buffer);
  } catch (err) {
    throw err;
  }
}
