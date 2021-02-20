import EncodedContentWrapper from '@/modules/EncodedContentWrapper';
import { Base64 } from 'js-base64';

export default class DecoderImageToText {
  private context: CanvasRenderingContext2D;
  private size: number;

  constructor(context: CanvasRenderingContext2D, size: number) {
    this.context = context;
    this.size = size;
  }

  decode() {
    const encodedContent = this.getEncodedContent();

    const unwrappedEncodedContent = EncodedContentWrapper.unwrap(
      encodedContent
    );

    const decodedContent = Base64.decode(unwrappedEncodedContent);

    return decodedContent;
  }

  private getEncodedContent() {
    let encodedContent = '';
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        const [charCode, green, blue] = this.getPixel(x, y);
        const encodedLetter = String.fromCharCode(charCode);
        encodedContent += encodedLetter;
      }
    }

    return encodedContent;
  }

  private getPixel(x, y) {
    return this.context.getImageData(x, y, this.size, this.size).data;
  }
}
