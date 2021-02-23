import * as path from 'path';

export default {
  tempFilesPath: path.resolve(__dirname, '..', 'temp'),
  moduleAliases: {
    '@': path.resolve(__dirname),
  },
  encoded: {
    fileExtension: 'jpg',
    contentBegin: '<<<<',
    contentEnd: '>>>>',
  },
};
