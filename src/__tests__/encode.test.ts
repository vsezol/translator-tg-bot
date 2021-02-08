import { Base64 } from 'js-base64';
import appConfig from '../app.config';
import {
  generatePathForEncodedFile,
  getEncodedBufferFromText
} from '../encode';

describe('encode', () => {
  describe('generatePathForEncodedFile', () => {
    it('should return string', () => {
      const returnType = typeof generatePathForEncodedFile();

      expect(returnType).toBe('string');
    });

    it('should generate random path', () => {
      const path1 = generatePathForEncodedFile();
      const path2 = generatePathForEncodedFile();

      expect(path1).not.toEqual(path2);
    });

    it('should generate path with base', () => {
      const BASE_URL = appConfig.tempFilesPath;

      const path = generatePathForEncodedFile();

      expect(path).toMatch(BASE_URL);
    });
  });

  describe('getEncodedBufferFromText', () => {
    it('should return buffer', () => {
      const text = 'TEST FOR TEST';

      const returnData = getEncodedBufferFromText(text);

      expect(returnData).toBeInstanceOf(Buffer);
    });

    describe('decode encoded buffer to begin text', () => {
      it.each`
        text
        ${'TEST FOR TEST'}
        ${'POPAJOPA'}
        ${'KRINJ'}
        ${'HELLO. How are You?!'}
        ${'Русский текст'}
      `('when text is $text', ({text}) => {
        const encodedBuffer = getEncodedBufferFromText(text);
        const encodedText = encodedBuffer.toString('base64');
        const decodedText = Base64.decode(encodedText);

        expect(decodedText).toEqual(text);
      });
    });
  });
});
