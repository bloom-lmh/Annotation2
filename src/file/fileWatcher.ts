import chokidar, { ChokidarOptions } from "chokidar";

export type FileWatchHandler = {
  add?: (path: string) => void,
  change?: (path: string) => void,
  unlink?: (path: string) => void,
}

/**
 * 文件监听器
 */
export class FileWatcher {
  /**
   * 
   * @param files 要监听的文件数组
   * @param handler 对这些文件的处理函数
   */
  public static watchFiles(files: Array<string>, handler: FileWatchHandler, config?: ChokidarOptions) {
    // 设置默认值
    config = config || {
      // 持续监听
      persistent: true,
      depth: 0
    }
    // 创建监听器
    const watcher = chokidar.watch(files, config);
    // 对文件进行监听
    for (const key in handler) {
      if (handler.hasOwnProperty(key)) { // 过滤掉继承的属性
        // 类型断言，告诉 TypeScript key 必须是 'add' | 'change' | 'unlink' 之一
        const eventHandler = handler[key as 'add' | 'change' | 'unlink'];
        // 确保 handler[key] 是一个函数
        if (typeof eventHandler === 'function') {
          watcher.on(key, eventHandler);
        }
      }
    }
  }
}
