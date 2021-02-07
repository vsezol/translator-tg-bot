import * as fs from 'fs/promises';

export async function removeFile(path: string) {
  try {
    await fs.unlink(path);
  } catch (err) {
    throw err;
  }
}
