import { SavingError, RemovingError } from '@/modules/errors';

describe('Error', () => {
  const FAKE_MESSAGE = 'FAKE_MESSAGE';
  const FAKE_PATH = '/fake/path/to/fake/file';

  describe('FileError', () => {
    const FAKE_NAME = 'FakeError';
    let fakeFileError;

    beforeEach(() => {
      fakeFileError = new FileError(FAKE_NAME, FAKE_MESSAGE, FAKE_PATH);
    });

    it('to be instance of Error', () => {
      expect(fakeFileError).toBeInstanceOf(Error);
    });

    it('to have right filePath', () => {
      expect(fakeFileError?.filePath).toBe(FAKE_PATH);
    });

    it('to have right message', () => {
      expect(fakeFileError?.message).toBe(FAKE_MESSAGE);
    });

    it('to have right name', () => {
      expect(fakeFileError?.name).toBe(FAKE_NAME);
    });
  });

  describe('FileError Childrens', () => {
    describe('SavingError', () => {
      it('to be instance of FileError', () => {
        expect(new SavingError(FAKE_MESSAGE, FAKE_PATH)).toBeInstanceOf(
          FileError
        );
      });
    });

    describe('Removing Error', () => {
      it('to be instance of FileError', () => {
        expect(new RemovingError(FAKE_MESSAGE, FAKE_PATH)).toBeInstanceOf(
          FileError
        );
      });
    });
  });
});
