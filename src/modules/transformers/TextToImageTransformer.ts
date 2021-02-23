import { Base64 } from 'js-base64';

import ContentDrawer from '@/modules/drawers/ContentDrawer';
import ImageEncoder from '@/modules/ImageEncoder';
import { ImageSaver, FileRemover } from '@/modules/fileWorkers';
import { RemovingError, SavingError } from '../errors';

export default class TextToImageTransformer {
  private text: string;
  private pixelSize: number;
  private outPath: string;

  constructor({
    text,
    pixelSize,
    outPath,
  }: {
    text: string;
    pixelSize: number;
    outPath: string;
  }) {
    this.text = text;
    this.outPath = outPath;
    this.pixelSize = pixelSize;
  }

  transform() {
    const canvas = this.transformTextToCanvas();

    return ImageSaver.save(this.outPath, canvas).catch(() => {
      throw new SavingError(
        'Error in saving file after transforming.',
        this.outPath
      );
    });
  }

  clear() {
    return FileRemover.remove(this.outPath).catch((error) => {
      throw new RemovingError(
        'Error in removing file after sending to user.',
        this.outPath
      );
    });
  }

  private transformTextToCanvas() {
    const encoderImage = new ImageEncoder({
      text: this.encodedText,
    });
    const encodedContent = encoderImage.encode();

    const contentDrawer = new ContentDrawer({
      content: encodedContent,
      pixelSize: this.pixelSize,
    });

    const canvas = contentDrawer.draw();

    return canvas;
  }

  private get encodedText() {
    return Base64.encode(this.text);
  }
}
