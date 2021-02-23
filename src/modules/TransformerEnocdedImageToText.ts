import DecoderImageToText from '@/modules/DecoderImageToText';
import DrawerEncodedImageOnCanvas from '@/modules/DrawerEncodedImageOnCanvas';

export default class TransformerEnocdedImageToText {
  static async transform(path: string, size: number, pixelSize: number) {
    const drawerEncodedImageOnCanvas = new DrawerEncodedImageOnCanvas(size);

    try {
      const { context } = await drawerEncodedImageOnCanvas.draw(path);
      const decoderImageToText = new DecoderImageToText(context, size, pixelSize);
      const decodedContent = decoderImageToText.decode();

      return decodedContent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
