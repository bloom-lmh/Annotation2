import { JSDocStructure } from "ts-morph";
import { BaseAnnotation } from "../annotation/baseAnnotation";
import { JsDocGenerateStrategy, StringStrategy } from "./jsDocGenerateStrategy";

/**
 * jsdoc生成器
 */
export class JsDocGenerator<T extends BaseAnnotation> {
    /**
     * JsDoc生成策略类
     */
    private jsDocGenerateStrategy: JsDocGenerateStrategy
    /**
     * 注解对象
     */
    private annotation: T

    constructor(annotation: T, jsDocGenerateStrategy: JsDocGenerateStrategy = new StringStrategy<T>()) {
        this.jsDocGenerateStrategy = jsDocGenerateStrategy
        this.annotation = annotation
    }
    public generateJsDoc(): string | JSDocStructure {
        return this.jsDocGenerateStrategy.generateJsDoc(this.annotation)
    }
}