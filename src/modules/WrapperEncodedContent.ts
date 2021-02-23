import appConfig from '@/app.config';

export default class WrapperEncodedContent {
  static wrap(content: string): string {
    return (
      appConfig.encoded.contentBegin + content + appConfig.encoded.contentEnd
    );
  }

  static unwrap(content: string): string {
    const endIndex = content.indexOf(appConfig.encoded.contentEnd);
    const endLength = appConfig.encoded.contentEnd.length;
    const cuttedContent = content.slice(0, endIndex + endLength);

    return cuttedContent
      .replace(appConfig.encoded.contentBegin, '')
      .replace(appConfig.encoded.contentEnd, '');
  }
}
