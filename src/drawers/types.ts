import { EncoderTextToImage } from '../encoders/types';

export namespace DrawerEncodedContentOnCanvas {
  export interface Props {
    pixelSize?: number;
    encodedContent: EncoderTextToImage.EncodedImageContent;
  }
}
