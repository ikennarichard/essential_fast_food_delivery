export class Logger {
  static getTimestamp(): string {
    return new Date().toLocaleString();
  }

  static info(message: string, ...optionalParams: any[]) {
    console.log(`${Logger.getTimestamp()} → ${message}`, ...optionalParams);
  }

  static warn(message: string, ...optionalParams: any[]) {
    console.warn(`${Logger.getTimestamp()} → ${message}`, ...optionalParams);
  }

  static error(message: string, ...optionalParams: any[]) {
    console.error(`${Logger.getTimestamp()} → ${message}`, ...optionalParams);
  }

  static debug(message: string, ...optionalParams: any[]) {
    console.debug(`${Logger.getTimestamp()} → ${message}`, ...optionalParams);
  }
}
