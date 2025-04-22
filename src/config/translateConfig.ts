import { ITranslateConfig } from './configType';

export class TranslateConfig implements ITranslateConfig {
  isOpen: boolean;
  api: string | string[] | Map<string, string[]>;
  wordMap: { [key: string]: string };
  isMemoryEnabled: boolean;

  // 构造器使用解构语法
  constructor(config: Partial<ITranslateConfig> = {}) {
    const {
      isOpen = true,
      api = 'http://www.trans-home.com/api/index/translateLogs?token=0zbtxTxstrLwQ9uK2PuR',
      wordMap = {},
      isMemoryEnabled = true,
    } = config;

    // 使用解构后的值进行赋值
    this.isOpen = isOpen;
    this.api = api;
    this.wordMap = wordMap;
    this.isMemoryEnabled = isMemoryEnabled;
  }

  // 链式编程的 set 方法
  setOpen(value: boolean): this {
    this.isOpen = value;
    return this;
  }

  setApi(value: string | string[] | Map<string, string[]>): this {
    this.api = value;
    return this;
  }

  setWordMap(value: { [key: string]: string }): this {
    this.wordMap = value;
    return this;
  }

  setMemoryEnabled(value: boolean): this {
    this.isMemoryEnabled = value;
    return this;
  }
}
