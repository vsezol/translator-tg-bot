import { EncodedImageContent } from '../types/EncoderTextToImageTypes';
import WrapperEncodedContent from './WrapperEncodedContent';

export default class EncoderTextToImage {
  private charCodes: number[];

  constructor({ encodedText }: { encodedText: string }) {
    const wrappedEncodedText = WrapperEncodedContent.wrap(encodedText);
    this.charCodes = this.textToCharCodes(wrappedEncodedText);
  }

  private textToCharCodes(text: string) {
    return text.split('').map((item) => item.charCodeAt(0));
  }

  public encode(): EncodedImageContent {
    let encodedContent = this.charCodes.map((code) => this.getPixel(code));
    encodedContent = this.refillContentToSquare(encodedContent);
    return encodedContent;
  }

  private refillContentToSquare(encodedContent: EncodedImageContent) {
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
