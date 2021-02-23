import { ImageContent } from '@/types/EncoderTextToImageTypes';
import StringWrapper from '@/modules/StringWrapper';
import appConfig from '@/app.config';

export default class ImageEncoder {
  private charCodes: number[];

  constructor({ text }: { text: string }) {
    const wrapper = new StringWrapper({
      begin: appConfig.encoded.contentBegin,
      end: appConfig.encoded.contentEnd,
    });
    const wrappedText = wrapper.wrap(text);

    this.charCodes = this.textToCharCodes(wrappedText);
  }

  private textToCharCodes(text: string) {
    return text.split('').map((item) => item.charCodeAt(0));
  }

  public encode(): ImageContent {
    let encodedContent = this.charCodes.map((code) => this.getPixel(code));
    encodedContent = this.refillContentToSquare(encodedContent);
    return encodedContent;
  }

  private refillContentToSquare(encodedContent: ImageContent) {
    const squareDifference = this.calcSquareDifference();
    const randomContent = new Array(squareDifference)
      .fill('')
      .map(() => this.getRandomPixel());

    const refilledEncodedContent = [...encodedContent, ...randomContent];

    return refilledEncodedContent;
  }

  private calcSquareDifference() {
    const size = Math.ceil(Math.sqrt(this.charCodes.length));
    const squareDifference = Math.pow(size, 2) - this.charCodes.length;
    return squareDifference;
  }

  private getPixel(code: number) {
    return [
      code,
      ...new Array(2).fill('').map(() => this.getRandomCodeForPixel()),
    ];
  }

  private getRandomPixel() {
    const randomRgb = new Array(3)
      .fill('')
      .map(() => this.getRandomCodeForPixel());

    return randomRgb;
  }

  private getRandomCodeForPixel() {
    return Math.floor(Math.random() * 255);
  }
}
