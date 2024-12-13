import { JSDocStructure } from "ts-morph";
import { BaseAnnotation } from "../annotation/annotation";

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
    public generateJsDoc(annotation: T): string | JSDocStructure {
        throw new Error("Method not implemented.");
    }
}
/**
 * jsDoc结构对象生成策略
 */
export class JsDocStructureStrategy<T extends BaseAnnotation> extends JsDocGenerateStrategy {
    public generateJsDoc(annotation: BaseAnnotation): string | JSDocStructure {
        throw new Error("Method not implemented.");
    }
}