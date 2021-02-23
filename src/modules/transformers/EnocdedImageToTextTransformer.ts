import ImageDecoder from '@/modules/ImageDecoder';
import ImageDrawer from '@/modules/drawers/ImageDrawer';

export default class EnocdedImageToTextTransformer {
  static async transform({
    path,
    size,
    pixelSize,
  }: {
    path: string;
    size: number;
    pixelSize: number;
  }) {
    const imageDrawer = new ImageDrawer(size);

    try {
      const { context } = await imageDrawer.draw(path);
      const decoderImageToText = new ImageDecoder({
        context,
        size,
        pixelSize,
      });
      const decodedContent = decoderImageToText.decode();

      return decodedContent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
