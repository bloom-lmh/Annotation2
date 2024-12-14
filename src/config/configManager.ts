import { basename, dirname } from "path";
import { FileWatcher } from "../file/fileWatcher";
import { WorkspaceUtil } from "../utils/workspaceUtil";
import { Config } from "./config";
import { ConfigLoader } from "./configLoader";
import { ClassAnnotation } from "../annotation/annotation";
import { ConfigBuilder } from "./configBuilder";

/**
 * 配置管理器
 */
export class ConfigManager {
    // 默认配置
    private static defaultConfig: Config
    // 配置文件缓存
    private static configMaps: Map<string, Config> = new Map()

    // 缓存配置文件
    public static addConfig(configFilePath: string, config?: Config) {
        // 没传配置则加载
        if (!config) {
            // 加载配置文件
            config = ConfigLoader.loadConfig(configFilePath)
        }
        if (config) {
            this.configMaps.set(configFilePath, config)
        }
        this.visitAll()
    }
    // 获取配置
    public static getConfig(configFilePath: string): Config {
        // 获取缓存的用户配置
        let projectConfig: Config = this.configMaps.get(configFilePath) || {}
        // 获取默认配置
        let defaultConfig: Config = this.getDefaultConfig()
        // 与默认配置合并返回
        let config: Config = Object.assign({}, defaultConfig, projectConfig)
        // 返回配置
        return config
    }
    // 删除配置文件
    public static removeConfig(configFilePath: string) {
        this.configMaps.delete(configFilePath)
        this.visitAll()
    }
    // 遍历map调试的时候使用
    public static visitAll() {
        for (const [key, value] of this.configMaps) {
            console.log("key:" + key, 'value:' + value);
        }
        console.log("\nsize:" + this.configMaps.size);

    }
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