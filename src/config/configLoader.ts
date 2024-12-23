import { existsSync, readFileSync } from "fs";
import { Config } from "./config";

/**
 * 配置加载器
 * @description 加载用户项目根目录下的配置
 */
export class ConfigLoader {
  /**
   * 加载配置文件
   * @param configFilePath 配置文件路径
   * @returns 
   */
  public static loadConfig(configFilePath: string): Config {
    // 项目配置
    let projectConfig: Partial<Config> = {}
    // 配置文件存在则进行读取，并转为配置对象
    if (existsSync(configFilePath)) {
      let jsonConfig = readFileSync(configFilePath, { encoding: 'utf-8' }).toString()
      projectConfig = JSON.parse(jsonConfig)
    }
    // 与默认配置进行合并后返回
    let config: Config = new Config(projectConfig)
    return config
  }
}