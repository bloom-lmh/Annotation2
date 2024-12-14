import { basename } from "path";
import { FileWatcher } from "../file/fileWatcher";
import { WorkspaceUtil } from "../utils/workspaceUtil";
import { Config } from "./config";
import { ConfigLoader } from "./configLoader";

/**
 * 配置管理器
 */
export class ConfigManager {
    // 配置文件缓存
    private static configMaps: Map<string, Config> = new Map()

    // 缓存配置文件
    public static add(projectPath: string, config?: Config) {
        // 没传配置则加载
        if (!config) {
            // 加载配置文件
            config = ConfigLoader.loadConfig(projectPath)
        }
        if (config) {
            this.configMaps.set(projectPath, config)
        }
        //this.visitAll()
    }
    // 获取配置
    public static get(projectPath: string): Config {
        // 获取缓存的用户配置,若用户没有进行配置则使用默认配置
        let config: Config = this.configMaps.get(projectPath) || new Config()
        // 返回配置
        return config
    }
    // 删除配置文件
    public static remove(projectPath: string) {
        this.configMaps.delete(projectPath)
        // this.visitAll()
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
                    this.add(path)
                }
            },
            unlink: (path) => {
                if (basename(path) === 'annotation.config.json') {
                    //console.log("remove:" + path);
                    this.remove(path)
                }
            },
            change: (path) => {
                if (basename(path) === 'annotation.config.json') {
                    //console.log("change:" + path);
                    this.add(path)
                }
            },
        }, {
            // 持续监听
            persistent: true,
            depth: 0
        })
    }
}