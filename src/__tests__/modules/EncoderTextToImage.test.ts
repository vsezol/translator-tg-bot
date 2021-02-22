import { Base64 } from 'js-base64';

import EncoderTextToImage from '@/modules/EncoderTextToImage';
import WrapperEncodedContent from '@/modules/WrapperEncodedContent';

describe('EncoderTextToImage', () => {
  describe('constructor', () => {
    it('wrap encoded text', () => {
      const FAKE_TEXT = 'FAKE teXt To TeSt :)';
      const FAKE_ENCODED_TEXT = Base64.encode(FAKE_TEXT);

      jest.spyOn(WrapperEncodedContent, 'wrap');

      const encoderTextToImage = new EncoderTextToImage({
        encodedText: FAKE_ENCODED_TEXT,
      });

      encoderTextToImage.encode();

      expect(WrapperEncodedContent.wrap).toHaveBeenCalled();
    });
  });

  describe('encode', () => {
    it.each`
      text
      ${'text with some length'}
      ${'русский текст'}
      ${'8888 Ц 0 И 0 Ф 0 Р 0 Ы 8888'}
      ${'123456'}
      ${'1234567'}
    `('returns an array with arrays with 3 numbers', ({ text }) => {
      const encoderTextToImage = new EncoderTextToImage({
        encodedText: Base64.encode(text),
      });
      const encodedImageContent = encoderTextToImage.encode();

      const expected = expect.arrayContaining(
        new Array(encodedImageContent.length).fill(
          expect.arrayContaining([
            expect.any(Number),
            expect.any(Number),
            expect.any(Number),
          ])
        )
      );

      expect(encodedImageContent).toEqual(expected);
    });
  });
});
