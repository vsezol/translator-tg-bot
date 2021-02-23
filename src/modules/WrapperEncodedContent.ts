import appConfig from '@/app.config';

interface Wrapper {
  begin: string;
  end: string;
}

export default class WrapperEncodedContent {
  wrapper: Wrapper;

  constructor(wrapper: Wrapper) {
    this.wrapper = wrapper;
  }

  wrap(content: string): string {
    return this.wrapper.begin + content + this.wrapper.end;
  }

  unwrap(content: string): string {
    const { begin, end } = this.wrapper;

    const endIndex = content.indexOf(end);
    const cuttedContent = content.slice(0, endIndex + end.length);

    return cuttedContent.replace(begin, '').replace(end, '');
  }
}
