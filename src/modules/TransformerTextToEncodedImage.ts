import { Base64 } from 'js-base64';

import DrawerEncodedContentOnCanvas from './DrawerEncodedContentOnCanvas';
import EncoderTextToImage from './EncoderTextToImage';

export default class TransformerTextToEncodedImage {
  static transform(text: string, pixelSize: number) {
    const encodedText = Base64.encode(text);

    const encoderImage = new EncoderTextToImage({
      encodedText,
    });
    const encodedContent = encoderImage.encode();

    const drawerEncodedContentOnCanvas = new DrawerEncodedContentOnCanvas({
      encodedContent,
      pixelSize,
    });

    const canvas = drawerEncodedContentOnCanvas.draw();

    return canvas;
  }
}
