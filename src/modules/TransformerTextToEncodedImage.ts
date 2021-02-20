import { Base64 } from 'js-base64';

import DrawerEncodedContentOnCanvas from './DrawerEncodedContentOnCanvas';
import EncoderTextToImage from './EncoderTextToImage';

export default class TransformerTextToEncodedImage {
  static transform(text) {
    const encodedText = Base64.encode(text);

    const encoderImage = new EncoderTextToImage({
      encodedText,
    });
    const encodedContent = encoderImage.encode();

    const drawerEncodedContentOnCanvas = new DrawerEncodedContentOnCanvas({
      encodedContent,
      pixelSize: 1,
    });

    const canvas = drawerEncodedContentOnCanvas.draw();

    return canvas;
  }
}
