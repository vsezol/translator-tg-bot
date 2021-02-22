import { Canvas, CanvasRenderingContext2D, loadImage } from 'canvas';
import { DrawingImageError } from './errors/Error';

export default class DrawerEncodedImageOnCanvas {
  private canvas: Canvas;
  private context: CanvasRenderingContext2D;
  private size: number;

  constructor(size: number) {
    this.size = size;
    this.canvas = new Canvas(this.size, this.size);
    this.context = this.canvas.getContext('2d');
  }

  draw(path: string) {
    return loadImage(path)
      .then((image) => {
        this.context.drawImage(image, 0, 0, this.size, this.size);
        return Promise.resolve({ canvas: this.canvas, context: this.context });
      })
      .catch((err) => {
        console.log(err);
        throw new DrawingImageError('Error in drawing image on Canvas.');
      });
  }
}
