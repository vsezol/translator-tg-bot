import { Base64 } from 'js-base64';

import ContentDrawer from '@/modules/drawers/ContentDrawer';
import ImageEncoder from '@/modules/ImageEncoder';

export default class EncodedImageFromTextTransformer {
  static transform({ text, pixelSize }: { text: string; pixelSize: number }) {
    const encodedText = Base64.encode(text);

    const encoderImage = new ImageEncoder({
      text: encodedText,
    });
    const encodedContent = encoderImage.encode();

    const contentDrawer = new ContentDrawer({
      content: encodedContent,
      pixelSize,
    });
    const canvas = contentDrawer.draw();

    return canvas;
  }
}
