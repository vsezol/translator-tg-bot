import appConfig from '@/app.config';

export default class EncodedContentWrapper {
  static wrap(content: string): string {
    return (
      appConfig.encoded.contentBegin + content + appConfig.encoded.contentEnd
    );
  }

  static unwrap(content: string): string {
    return content
      .replace(appConfig.encoded.contentBegin, '')
      .replace(appConfig.encoded.contentEnd, '');
  }
}
