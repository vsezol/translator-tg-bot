import appConfig from '@/app.config';
import WrapperEncodedContent from '@/modules/WrapperEncodedContent';
import { Base64 } from 'js-base64';

export default class DecoderImageToText {
  private context: CanvasRenderingContext2D;
  private size: number;
  private pixelSize: number;

  constructor(
    context: CanvasRenderingContext2D,
    size: number,
    pixelSize: number = 5
  ) {
    this.context = context;
    this.size = size / pixelSize;
    this.pixelSize = pixelSize;
  }

  decode() {
    const encodedContent = this.getEncodedContent();

    const wrapper = new WrapperEncodedContent({
      begin: appConfig.encoded.contentBegin,
      end: appConfig.encoded.contentEnd,
    });
    const unwrappedEncodedContent = wrapper.unwrap(encodedContent);

    const decodedContent = Base64.decode(unwrappedEncodedContent);

    return decodedContent;
  }

  private getEncodedContent() {
    let encodedContent = '';
    this.iterateAllPixels((x, y) => {
      const [charCode, green, blue] = this.getPixel(x, y);
      const encodedLetter = String.fromCharCode(charCode);
      encodedContent += encodedLetter;
    });

    return encodedContent;
  }

  private iterateAllPixels(callback: (x: number, y: number) => void) {
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        callback(x, y);
      }
    }
  }

  private getPixel(x, y) {
    const scaledX = this.scaleCord(x);
    const scaledY = this.scaleCord(y);

    const pixel = this.context.getImageData(
      scaledX,
      scaledY,
      this.size,
      this.size
    );

    return pixel.data;
  }

  private scaleCord(cord) {
    return this.pixelSize * cord;
  }
}
