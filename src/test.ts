class Person {
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
