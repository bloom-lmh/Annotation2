export class AssertUtil {
    /**
     * 
     * @param obj 要断言的对象
     * @param callback 为空时的处理函数
     */
    public static objectIsNull(obj?: object, callback?: () => void): boolean {
        if (obj) {
            return false
        }
        callback && callback()
        return true
    }
}