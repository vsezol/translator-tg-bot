import { EncoderTextToImage } from '../encoders/encodersTypes';

export namespace DrawerEncodedContentOnCanvas {
  export interface Props {
    pixelSize?: number;
    encodedContent: EncoderTextToImage.EncodedImageContent;
  }
}
