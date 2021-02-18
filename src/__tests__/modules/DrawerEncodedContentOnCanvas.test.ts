import DrawerEncodedContentOnCanvas from '@/modules/DrawerEncodedContentOnCanvas';
import { EncodedImageContent } from '@/types/EncoderTextToImageTypes';
import * as canvas from 'canvas';

jest.spyOn(canvas, 'createCanvas');

describe('DrawerEncodedContentOnCanvas', () => {
  const FAKE_PIXEL_SIZE = 5;
  const FAKE_ENCODED_CONTENT: EncodedImageContent = [
    [100, 21, 3],
    [4, 53, 126],
    [91, 200, 1],
    [222, 5, 55],
  ];

  describe('constructor', () => {
    it('calls createCanvas', () => {
      new DrawerEncodedContentOnCanvas({
        pixelSize: FAKE_PIXEL_SIZE,
        encodedContent: FAKE_ENCODED_CONTENT,
      });

      expect(canvas.createCanvas).toHaveBeenCalled();
    });
  });

  describe('draw', () => {
    it('returns canvas', () => {
      const drawerEncodedContentOnCanvas = new DrawerEncodedContentOnCanvas({
        pixelSize: FAKE_PIXEL_SIZE,
        encodedContent: FAKE_ENCODED_CONTENT,
      });

      const coloredCanvas = drawerEncodedContentOnCanvas.draw();

      expect(coloredCanvas).toBeInstanceOf(canvas.Canvas);
    });
  });
});
