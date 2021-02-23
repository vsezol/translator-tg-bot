interface Wrapper {
  begin: string;
  end: string;
}

export default class StringWrapper {
  wrapper: Wrapper;

  constructor(wrapper: Wrapper) {
    this.wrapper = wrapper;
  }

  wrap(text: string): string {
    return this.wrapper.begin + text + this.wrapper.end;
  }

  unwrap(text: string): string {
    const { begin, end } = this.wrapper;

    const endIndex = text.indexOf(end);
    const cuttedText = text.slice(0, endIndex + end.length);

    return cuttedText.replace(begin, '').replace(end, '');
  }
}
