import { Canvas, createCanvas } from 'canvas';
import { EncodedImageContent } from '../types/EncoderTextToImageTypes';

export default class DrawerEncodedContentOnCanvas {
  private pixelSize: number;
  private encodedContent: EncodedImageContent;

  private canvas: Canvas;
  private context: CanvasRenderingContext2D;

  constructor({
    pixelSize = 5,
    encodedContent,
  }: {
    pixelSize?: number;
    encodedContent: EncodedImageContent;
  }) {
    this.pixelSize = pixelSize;
    this.encodedContent = encodedContent;

    this.initCanvas();
  }

  public draw() {
    this.drawPixels();
    return this.canvas;
  }

  private drawPixels() {
    let pixelNumber = 0;
    for (let x = 0; x < this.size; x++) {
      for (let y = 0; y < this.size; y++) {
        let rgb = this.encodedContent[pixelNumber];

        this.drawPixel(rgb, [x, y]);

        pixelNumber++;
      }
    }
  }

  private drawPixel(code: number[], [x, y]) {
    const scaledX = x * this.pixelSize;
    const scaledY = y * this.pixelSize;

    this.context.beginPath();
    this.context.fillStyle = this.getPixelRgbString(code);
    this.context.fillRect(scaledX, scaledY, this.pixelSize, this.pixelSize);
    this.context.stroke();
  }

  private getPixelRgbString([red, green, blue]: number[]) {
    return `rgb(${red}, ${green}, ${blue})`;
  }

  private initCanvas() {
    this.canvas = createCanvas(this.scaledSize, this.scaledSize);
    this.context = this.canvas.getContext('2d');
  }

  private get scaledSize() {
    return this.size * this.pixelSize;
  }

  private get size() {
    const length = this.encodedContent.length;
    return Math.sqrt(length);
  }
}
