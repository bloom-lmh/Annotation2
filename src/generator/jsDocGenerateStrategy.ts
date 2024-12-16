import { JSDocStructure } from "ts-morph";
import { BaseAnnotation } from "../annotation/baseAnnotation";

/**
 * jsdoc生成策略
 */
export abstract class JsDocGenerateStrategy {
    public abstract generateJsDoc(annotation: BaseAnnotation): string | JSDocStructure
}
/**
 * 字符串拼接策略
 */
export class StringStrategy<T extends BaseAnnotation> extends JsDocGenerateStrategy {
    public generateJsDoc(annotation: T): string {
        console.log(annotation);

        /* if (annotation instanceof ClassAnnotation) {

        } */
        // 解构注解
        return `
/**
 * @params {number} data
 * @params {number} name
 * @return {number} name
 */`
    }
}
/**
 * jsDoc结构对象生成策略
 */
export class JsDocStructureStrategy<T extends BaseAnnotation> extends JsDocGenerateStrategy {
    public generateJsDoc(annotation: BaseAnnotation): string | JSDocStructure {
        return "对象假注解"
    }
}