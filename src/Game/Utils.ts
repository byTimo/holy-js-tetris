export interface Point {
    x: number;
    y: number;
}

export function range(start: number, count: number): number[] {
    const result: number[] = [];
    for (let i = start; i < start + count; i++) {
        result.push(i);
    }
    return result;
}

export function toMap<TKey, TValue>(source: TValue[], keySelector: (value: TValue) => TKey): Map<TKey, TValue> {
    const map: Map<TKey, TValue> = new Map();
    for (const value of source) {
        const key = keySelector(value);
        map.set(key, value);
    }

    return map;
}

export type TypeOf<T> = { new(...args: any): T };

export function getType<T extends object>(instance: T): TypeOf<T> {
    return instance.constructor as TypeOf<T>;
}

export function animate(action: () => void, interval: number) {
    let then = Date.now();
    function animateInternal() {
        requestAnimationFrame(animateInternal);

        const now = Date.now();
        const elapsed = now - then;

        if (elapsed > interval) {
            then = now - (elapsed % interval);
            action();
        }
    }
    animateInternal();
}

export const random = (min: number, max: number): number => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}