import { ClassDeclaration, EnumDeclaration, FunctionDeclaration, InterfaceDeclaration, MethodDeclaration, PropertyDeclaration, TypeAliasDeclaration } from "ts-morph";
import { ClassAnnotationConfig, Config, EnumAnnotationConfig, GlobalAnnotationConfig, InterfaceAnnotationConfig, MethodAnnotationConfig, PropertyAnnotationConfig, TypedefAnnotationConfig } from "../config/config";
import { AstUtil, MemberDeclaration } from "../utils/astUtil";
import { ClassAnnotation, EnumAnnotation, InterfaceAnnotation, MethodAnnotation, PropertyAnnotation, TypedefAnnotation } from "./annotation";

/**
 * 注解工厂
 */
export class AnnotationFactory {
    // 根据成员声明信息和配置生成注解
    public static getAnnotation(memberDeclaration: MemberDeclaration, config: Config) {
        // 解析配置
        let { classAnnotationConfig, methodAnnotationConfig, propertyAnnotationConfig, enumAnnotationConfig, globalAnnotationConfig, interfaceAnnotationConfig, typedefAnnotationConfig, translateConfig } = config
        const { author: authorValue, version: versionValue, description: descriptionValue, license: licenseValue, copyright: copyrightValue, } = globalAnnotationConfig || new GlobalAnnotationConfig()
        // 获取方法名
        const memberName = memberDeclaration?.getName() || ""
        // 若是方法，创建方法注释对象
        if (memberDeclaration instanceof MethodDeclaration || memberDeclaration instanceof FunctionDeclaration) {

            // 获取方法配置
            const { author, alias, version, name, description, license, copyright, see, summary, example, params, returns, throws, async, access } = methodAnnotationConfig || new MethodAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""
            // 获取方法参数
            const _params = params ? memberDeclaration.getParameters().map(param => {
                return [param.getName(), param.getType().getText()]
            }) : []
            // 获取方法返回值
            const _returns = returns ? memberDeclaration.getReturnType().getText() : ""
            // 获取方法抛出异常
            const _throws = throws ? AstUtil.getMethodThrows(memberDeclaration) : new Set<string>
            // 获取方法是否异步
            const _async = async ? !!memberDeclaration.getAsyncKeyword()?.getText() : false
            // 获取方法访问控制信息
            let _access = ""
            if (access) {
                memberDeclaration.getModifiers().forEach(modifier => {
                    if (modifier.getText()) {
                        _access = modifier.getText()
                    }
                })
            }
            // 创建注解并返回
            return new MethodAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
                .setParamsTag(_params)
                .setReturnsTag(_returns)
                .setAsyncTag(_async)
                .setAccessTag(_access)
                .setThrowsTag(_throws)
        }
        // 若是属性，创建属性注释对象
        if (memberDeclaration instanceof PropertyDeclaration) {
            const { author, alias, name, version, description, license, copyright, see, summary, example, type, property, default: defaultTag, static: staticTag, access } = propertyAnnotationConfig || new PropertyAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""
            // 获取属性参数
            const _type = type ? memberDeclaration.getType().getText() : ""
            // 获取默认值
            const _default = defaultTag ? memberDeclaration.getInitializer()?.getText() || "" : ""

            // 获取访问权限修饰符
            let _access = ""
            if (access) {
                memberDeclaration.getModifiers().forEach(modifier => {
                    if (modifier.getText() && modifier.getText() !== "static") {
                        _access = modifier.getText()
                    }
                })
            }

            // 获取是否静态变量
            const _static = staticTag ? memberDeclaration.isStatic() : false
            // 创建属性注解并返回
            return new PropertyAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
                .setNameTag(memberName)
                .setTypeTag(_type)
                .setAccessTag(_access)
                .setStaticTag(_static)
                .setDefaultTag(_default)
        }
        // 若是类，创建类注释对象
        if (memberDeclaration instanceof ClassDeclaration) {
            const { author, alias, name, version, description, license, copyright, see, summary, example, abstract: abstractTag, extends: extendsTag, implements: implementsTag } = classAnnotationConfig || new ClassAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""
            // 获取抽象标志
            const _abstract = abstractTag ? memberDeclaration.isAbstract() : false
            // 获取继承的类名
            const _extends = extendsTag ? memberDeclaration.getExtends()?.getText() || "" : ""
            // 获取实现的接口
            const _implements = implementsTag ? memberDeclaration.getImplements().map(implement => {
                return implement.getText()
            }) : []

            return new ClassAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
                .setNameTag(memberName)
                .setAbstract(_abstract)
                .setExtendsTag(_extends)
                .setImplementsTag(_implements)
        }
        // 若是枚举，创建枚举注释对象
        if (memberDeclaration instanceof EnumDeclaration) {
            const { author, alias, name, version, description, license, copyright, see, summary, example } = enumAnnotationConfig || new EnumAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""
            // 创建枚举注解对象
            return new EnumAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
        }
        // 若是接口，创建接口注释对象
        if (memberDeclaration instanceof InterfaceDeclaration) {
            const { author, alias, name, version, description, license, copyright, see, summary, example } = interfaceAnnotationConfig || new InterfaceAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""
            // 创建接口注解对象并返回
            return new InterfaceAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
        }

        // 若是自定义类型，创建自定义类型注释对象
        if (memberDeclaration instanceof TypeAliasDeclaration) {
            const { author, alias, name, version, description, license, copyright, see, summary, example, type } = typedefAnnotationConfig || new TypedefAnnotationConfig()
            // 成员名
            const _name = name ? memberName : ""
            // 作者标签
            const _author = author ? authorValue : ""
            // 版本标签
            const _version = version ? versionValue : ""
            // 执照标签
            const _license = license ? licenseValue : ""
            // 版权标签
            const _copyright = copyright ? copyrightValue : ""

            let typeName = ""
            if (type) {
                // 获取类型
                const _type = memberDeclaration.getType()
                // 获取类型名
                if (_type.isUnion()) {
                    const typeArr = _type.getUnionTypes().map((unionType) => {
                        return unionType.getText()
                    });
                    typeName = typeArr.join("|")
                } else {
                    typeName = _type.getText()
                }
            }

            // 返回自定义类型注解对象
            return new TypedefAnnotation()
                .setNameTag(_name)
                .setAuthorTag(_author)
                .setAliasTag(alias)
                .setVersionTag(_version)
                .setDescriptionTag(description)
                .setLicenseTag(_license)
                .setCopyrightTag(_copyright)
                .setSeeTag(see)
                .setSummaryTag(summary)
                .setExampleTag(example)
                .setTypeTag(typeName)
        }
    }
}