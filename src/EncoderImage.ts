import { Canvas, CanvasRenderingContext2D, createCanvas } from 'canvas';
import RemoverFile from './RemoverFile';
import SaverImage from './SaverImage';
import { EncoderImage } from './types';

export default class EncoderImageImpl {
  canvas: Canvas;
  context: CanvasRenderingContext2D;

  charCodes: number[];

  pixelSize: number;

  path: string;

  constructor({ path, encodedText, pixelSize = 5 }: EncoderImage.Props) {
    this.charCodes = this.textToCharCodes(encodedText);

    this.pixelSize = pixelSize;
    this.canvas = createCanvas(this.size[0], this.size[1]);
    this.context = this.canvas.getContext('2d');
    this.path = path;
  }

  public encode() {
    this.drawPixels();
  }

  public async save() {
    await SaverImage.save(this.path, this.canvas);
  }

  public async remove() {
    await RemoverFile.remove(this.path);
  }

  private drawPixels() {
    let pixelNumber = 0;

    for (let x = 0; x < this.size[0]; x += this.pixelSize) {
      for (let y = 0; y < this.size[1]; y += this.pixelSize) {
        const code = this.charCodes[pixelNumber];

        this.drawPixel(code, [x, y]);

        pixelNumber++;
      }
    }
  }

  private drawPixel(code, [x, y]) {
    this.context.beginPath();
    this.context.fillStyle = this.getPixelRgbString(code);
    this.context.fillRect(x, y, this.pixelSize, this.pixelSize);
    this.context.stroke();
  }

  private getPixelRgbString(code: number) {
    const [red, green, blue] = this.getPixel(code);

    return `rgb(${red}, ${green}, ${blue})`;
  }

  private getPixel(code: number) {
    return [code, this.getRandomCodeForPixel(), this.getRandomCodeForPixel()];
  }

  private getRandomCodeForPixel() {
    return Math.floor(Math.random() * 255);
  }

  private get size() {
    const length = this.charCodes.length;

    return [
      Math.ceil(Math.sqrt(length)) * this.pixelSize,
      Math.floor(Math.sqrt(length)) * this.pixelSize,
    ];
  }

  private textToCharCodes(text: string) {
    return text.split('').map((item) => item.charCodeAt(0));
  }
}
