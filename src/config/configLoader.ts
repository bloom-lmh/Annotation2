import { existsSync, readFileSync } from "fs";
import { Config } from "./config";
import path from "path";

/**
 * 配置加载器
 */
export class ConfigLoader {
    /**
     * 
     * @param configFilePath 配置文件路径
     * @returns 
     */
    public static loadConfig(configFilePath: string): Config {
        let config: Config = {}
        let configPath = path.join(configFilePath)
        // 读取配置文件
        if (existsSync(configFilePath)) {
            let jsonConfig = readFileSync(configPath, { encoding: 'utf-8' }).toString()
            config = JSON.parse(jsonConfig)
        }
        return config
    }
}