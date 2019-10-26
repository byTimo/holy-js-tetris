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