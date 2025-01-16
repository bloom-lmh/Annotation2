import { existsSync, readFileSync } from "fs"
import { Config } from "./_config"

export class ConfigLoader {
  public loadConfig(configPath: string) {
    // 读取项目下的配置文件
    return this.loadProjectConfig(configPath) || this.loadVscodeConfig() || new Config()
    // 读取vscode下的配置
  }

  private loadVscodeConfig() {
    // 读取vscode配置下的文件路径
  }

  private loadProjectConfig(configPath: string) {
    // 项目配置
    let projectConfig: Partial<Config> = {}
    // 配置文件不存在返回null
    if (!existsSync(configPath)) return null
    // 配置文件存在则进行读取，并转为配置对象
    let jsonConfig = readFileSync(configPath, { encoding: 'utf-8' }).toString()
    projectConfig = JSON.parse(jsonConfig)
    // 与默认配置进行合并后返回
    let config: Config = new Config(projectConfig)
    return config
  }
}