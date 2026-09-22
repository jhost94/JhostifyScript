export default class ObservableValue<T = any> {
    protected observers = new Set<OberverSubscription<T>>();

    constructor(protected value: T) {

    }

    public static from<T = any>(data: T): ObservableValue<T> {
        return new ObservableValue(data);
    }

    public set(val: T): void {
        this.value = val;
        this.notify();
    }

    public get(): T {
        return this.value;
    }

    public subscribe(observer: OberverSubscription<T>) {
        this.observers.add(observer);

        return () => {
            this.observers.delete(observer);
        };
    }

    public notify() {
        for(const oberver of this.observers) {
            oberver(this.value);
        }
    }
}

declare type OberverSubscription<T = any> = (data: T) => {} | void