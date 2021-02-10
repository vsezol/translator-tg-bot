import * as path from 'path';
import { Base64 } from 'js-base64';
import appConfig from '../app.config';
import {
  createEncodeManager,
  generatePathForEncodedFile,
  getEncodedBufferFromText
} from '../encode';

jest.mock('../remove.ts');
jest.mock('../save.ts');
import { removeFile } from '../remove';
import { saveBufferAsFile } from '../save';

(removeFile as jest.Mock).mockResolvedValue(true);
(saveBufferAsFile as jest.Mock).mockResolvedValue(true);

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
      `('when text is $text', ({ text }) => {
        const encodedBuffer = getEncodedBufferFromText(text);
        const encodedText = encodedBuffer.toString('base64');
        const decodedText = Base64.decode(encodedText);

        expect(decodedText).toEqual(text);
      });
    });
  });

  describe('createEncodeManager', () => {
    let PATH;
    let BUFFER;
    let basePath;

    let encodedManager;

    beforeAll(() => {
      basePath = path.resolve(__dirname, '..', 'temp');
      PATH = path.resolve(basePath, 'test.fuck');
      BUFFER = Buffer.from(Base64.encode('test text'), 'base64');
    });

    beforeEach(() => {
      encodedManager = createEncodeManager(PATH, BUFFER);
    });

    it('should return two promises in values', async () => {
      await encodedManager.next().value;
      await encodedManager.next().value;

      expect(saveBufferAsFile).toHaveBeenCalled();
      expect(removeFile).toHaveBeenCalled();
    });

    it('should call saveBufferAsFile with (path, buffer)', async () => {
      await encodedManager.next().value;

      expect(saveBufferAsFile).toHaveBeenCalledWith(PATH, BUFFER)
    });

    it('should call removeFile with (path)', async () => {
      await encodedManager.next().value;
      await encodedManager.next().value;

      expect(removeFile).toHaveBeenCalledWith(PATH)
    });
  });
});
