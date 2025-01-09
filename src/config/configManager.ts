import path, { basename, dirname } from "path";
import { FileWatcher } from "../file/fileWatcher";
import { WorkspaceUtil } from "../utils/workspaceUtil";
import { Config } from "./config";

/**
 * 配置管理器
 */
export class ConfigManager {
  // 默认配置
  private static defaultConfig: Config = new Config()
  // 配置文件缓存
  private static configMaps: Map<string, Config> = new Map()

  // 缓存配置文件
  public static addConfig(projectPath: string, config?: Config) {
    // 没传配置则使用默认配置
    if (!config) {
      // 加载配置文件
      config = new Config()
    }
    if (config) {
      this.configMaps.set(projectPath, config)
    }

  }
  // 获取配置
  public static getConfig(projectPath: string | null | undefined): Config {
    if (!projectPath) return new Config()
    // 尝试获取缓存的用户配置
    let config = this.configMaps.get(projectPath) || new Config()
    // 返回配置
    return config
  }
  // 删除配置文件
  public static removeConfig(projectPath: string) {
    this.configMaps.delete(projectPath)
  }
  // 遍历map调试的时候使用
  /*   public static visitAll() {
        for (const [key, value] of this.configMaps) {
            console.log("key:" + key, 'value:' + value);
        }
        console.log("\nsize:" + this.configMaps.size);
    } */
  /**
   * 开启文件监听
   */
  public static startConfigWatch() {
    // 获取工作区配置文件
    const projectConfigFiles = WorkspaceUtil.getProjectPaths()
    /* 'annotation.config.json' */
    // 调用文件监听器监听文件
    FileWatcher.watchFiles(projectConfigFiles, {
      add: (path) => {
        if (basename(path) === 'annotation.config.json') {
          //console.log("add:" + path);
          this.addConfig(path)
        }
      },
      unlink: (path) => {
        if (basename(path) === 'annotation.config.json') {
          //console.log("remove:" + path);
          this.removeConfig(path)
        }
      },
      change: (path) => {
        if (basename(path) === 'annotation.config.json') {
          //console.log("change:" + path);
          this.addConfig(path)
        }
      },
    }, {
      // 持续监听
      persistent: true,
      depth: 0
    })
  }
  /**
   * 获取默认配置 单例模式
   */
  private static getDefaultConfig() {
    if (!this.defaultConfig) {
      this.defaultConfig = new Config()
    }
    return this.defaultConfig
  }
}