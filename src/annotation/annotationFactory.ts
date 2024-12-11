import { BaseAnnotation } from "./annotation";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    /**
     * 
     * @param className 构造函数
     * @returns 
     */
    public static getAnnotation(className: Function) {
        // 反射创建该对象
        let annotation = Reflect.construct(className, [])
        // 代理注解对象，添加set和get方法
        let annotationProxy = new Proxy(annotation, {
            // 获取属性值
            get(obj, prop) {
                return prop in obj ? obj[prop] : null;
            },
            // 设置属性值
            /* set(obj, prop, value) {

            }, */
        })
        return
    }
}