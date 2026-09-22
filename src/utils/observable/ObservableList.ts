import ObservableValue from "./ObservableValue";

export default class ObservableList<T = any> extends ObservableValue<T[]> {

    constructor(data: T[]) {
        super(data);
    }

    public static fromList<T = any>(data: T[]): ObservableList<T> {
        return new ObservableList(data);
    }

    public get(): T[] {
        return Object.assign([], this.value);
    }

    public push(...items: T[]): number {
        const r = this.value.push(...items);
        this.notify(items);
        return r;
    }

    public pop(): T | undefined {
        const r = this.value.pop();
        this.notify();
        return r;
    }

    public reverse(): T[] {
        const r = this.value.reverse();
        this.notify();
        return r;
    }

    public shift(): T | undefined {
        const r = this.value.shift();
        this.notify();
        return r;
    }

    public sort(compareFn?: (a: T, b: T) => number): T[] {
        const r = this.value.sort(compareFn);
        this.notify();
        return r;
    }

    public splice(start: number, deleteCount: number, ...items: T[]): T[] {
        const r = this.value.splice(start, deleteCount, ...items);
        this.notify();
        return r;
    }

    public unshift(...items: T[]): number {
        const r = this.value.unshift(...items);
        this.notify();
        return r;
    }

    public notify(items?: T[]): void {
        if (!!items) {
            for(const oberver of this.observers) {
                oberver(items);
            }
        } else {
            super.notify();
        }
    }
}