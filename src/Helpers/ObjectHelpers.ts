export type TypeOf<T> = { new(...args: any): T };

export class ObjectHelper {
    static getType<T extends object>(instance: T): TypeOf<T> {
        return instance.constructor as TypeOf<T>;
    }

    static create<T>(type: TypeOf<T>, json: Partial<T>) {
        return Object.assign(new type(), json);
    }

    static filterByType<TSource, T extends TSource>(source: TSource[], type: TypeOf<T>) {
        const predicate = (value: TSource): value is T => value instanceof type;
        return source.filter(predicate);
    }
}