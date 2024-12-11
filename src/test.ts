class Person {
    private name: string
    private age: number
    public address: string
    constructor(name: string, age: number, address: string) {
        this.name = name
        this.age = age
        this.address = address
    }
}

let p = new Person("xx", 18, "asd")
console.log(p);


/* let pp = new Proxy(p, {
    set()
}) */