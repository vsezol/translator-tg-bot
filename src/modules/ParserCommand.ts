export default class ParserCommand {
  static isCommand(text: string, cmd: string) {
    return text.split(' ')[0] === cmd;
  }

  static parseCommand(cmd: string) {
    const [type, name, value] = cmd.split(' ');

    return { type, name, value };
  }
}
