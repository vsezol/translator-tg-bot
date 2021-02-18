import * as path from 'path';

export default {
  tempFilesPath: path.resolve(__dirname, '..', 'temp'),
  moduleAliases: {
    dev: {
      '@': path.resolve(__dirname),
    },
    prod: {
      '@': path.resolve(__dirname, '..', 'dist'),
    },
  },
  encoded: {
    fileExtension: 'jpg',
    contentBegin: '<<<<',
    contentEnd: '>>>>',
  },
};
