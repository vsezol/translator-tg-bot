import { Base64 } from 'js-base64';
import * as path from 'path';
import * as uuid from 'uuid';

import appConfig from './app.config';

export function getEncodedBufferFromText(text: string): Buffer {
  const encodedText = Base64.encode(text);
  const buffer = Buffer.from(encodedText);
  return buffer;
}

// export async function encodeTextToImg(path: string, text: string) {
//   const encodedText = Base64.encode(text);
//   const charCodes = encodedText.split('').map((item) => item.charCodeAt(0));

//   const imgWidth = Math.ceil(Math.sqrt(charCodes.length));
//   const imgHeight = Math.floor(Math.sqrt(charCodes.length));

//   const canvas = createCanvas(imgWidth, imgHeight);
//   const ctx = canvas.getContext('2d');

//   let pixelNumber = 0;
//   for (let x = 0; x < imgWidth; x++) {
//     for (let y = 0; y < imgHeight; y++) {
//       const code = charCodes[pixelNumber];

//       ctx.beginPath();
//       ctx.fillStyle = `rgb(${code}, ${getRandomCode()}, ${getRandomCode()})`;
//       ctx.fillRect(x, y, 1, 1);
//       ctx.stroke();

//       pixelNumber++;
//     }

//     function getRandomCode() {
//       return Math.floor(Math.random() * 255);
//     }
//   }

//   await saveImage(path, canvas);
// }

export function generatePathForEncodedFile(): string {
  return path.resolve(
    appConfig.tempFilesPath,
    `${uuid.v1()}.${appConfig.encodedFileExtension}`
  );
}
