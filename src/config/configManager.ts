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
        console.log("a");

        // 没传配置则加载
        /*  if (!config) {
             // 加载配置文件
             config = ConfigLoader.loadConfig(projectPath)
         }
         if (config) {
             this.configMaps.set(projectPath, config)
         } */
    }

    // 删除配置文件
    public static remove(projectPath: string) {
        console.log("b");
        this.configMaps.delete(projectPath)
    }

    /**
     * 开启文件监听
     */
    public static startConfigWatch() {
        // 获取工作区配置文件
        const projectConfigFiles = WorkspaceUtil.getProjectPaths('/annotation.config.json')

        // 调用文件监听器监听文件
        FileWatcher.watchFiles(projectConfigFiles, {
            add: (path) => { this.add(path) },
            unlink: (path) => { this.remove(path) }
        })
    }
}