import DecoderImageToText from './DecoderImageToText';
import DrawerEncodedImageOnCanvas from './DrawerEncodedImageOnCanvas';

export default class TransformerEnocdedImageToText {
  static async transform(path: string, size: number) {
    const drawerEncodedImageOnCanvas = new DrawerEncodedImageOnCanvas(size);

    try {
      const { context } = await drawerEncodedImageOnCanvas.draw(path);
      const decoderImageToText = new DecoderImageToText(context, size);
      const decodedContent = decoderImageToText.decode();

      return decodedContent;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}
