import { Config } from "./config";

/**
 * 配置加载器
 */
export class ConfigLoader {
    /**
     * 
     * @param projectPath 项目路径
     * @returns 
     */
    public static loadConfig(projectPath: string): Config {
        return new Config()
    }
}