/* class Person {
    private name: string | null = 'aa'
}
export class BaseAnnotation extends Person {
    private _name: string | null = null;      // 类名
    private _author: string | null = null;     // 作者信息
    private _deprecated: boolean | null = null; // 是否已过时
    private _memberof: string | null = null; // 所属的类或模块
    private _age: string | null = null

    constructor() {
        super()
        return new Proxy(this, {
            get(target, prop) {
                if (prop in target) {
                    return (target as any)[prop];
                }
                return undefined;
            },
            set(target, prop, value) {
                if (prop in target) {
                    (target as any)[prop] = value;
                } else {
                    console.error(`${String(prop)} is not a valid property.`);
                }
                return true;
            }
        });
    }
}
let baseAnnotation = new BaseAnnotation()
console.log(baseAnnotation['name']);
baseAnnotation['name'] = '22'
console.log(baseAnnotation['name']);
 */
function MakeReadOnly(target: any, propertyKey: string | symbol) {
    let value = target[propertyKey];
    const getter = function () {
        return value;
    };
    const setter = function () {
        throw new Error(`Attempted to update read-only property '}'`);
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
    });
}

class MyClass {
    @MakeReadOnly
    myProperty = "Hello, World!";
}

const obj = new MyClass();
console.log(obj.myProperty); // 输出: Hello, World!
obj.myProperty = "New Value"; // 抛出错误