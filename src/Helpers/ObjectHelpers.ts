export type TypeOf<T> = { new(...args: any): T };

export function getType<T extends object>(instance: T): TypeOf<T> {
    return instance.constructor as TypeOf<T>;
}