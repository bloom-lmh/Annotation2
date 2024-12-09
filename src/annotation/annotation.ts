/**
 * 抽象注解类
 * @description 定义所有注解模型具有的公共标签
 */
abstract class abstractAnnotation {


}

/**
 * 抽象类注解类
 * @description 定义类注解模型具有的基本标签
 */
abstract class abstractClassAnnotation {
    private _abstract: boolean = false
    private _class: boolean = true
    private _constructor: boolean = false
    private _interface: boolean = false
    private _extends: string = ''
    private _implements: string = ''
    private _example: string = ''
    private _deprecated: boolean = false
    private _params: Array<[string, string]> | Map<string, string> = []
}

/**
 * 抽象方法注解类
 * @description 定义方法注解模型具有的基本标签
 */
abstract class abstractMethodAnnotation { }

/**
 * abstractPropertyAnnotation类
 * @description
 */
abstract class abstractPropertyAnnotation { }

