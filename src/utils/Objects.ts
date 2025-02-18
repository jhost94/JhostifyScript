class Objects {

    public static isNull(o: any): boolean {
        return o === undefined || o === null;
    }

    public static nonNull(o: any): boolean {
        return !this.isNull(o);
    }

    public static sameType(o1: any, o2: any): boolean {
        return typeof o1 === typeof o2; 
    }

    public static diferentType(o1: any, o2: any): boolean {
        return !this.sameType(o1, o2);
    }
}

export default Objects;