export class ArrayHelper {
    static range(start: number, count: number): number[] {
        const result: number[] = [];
        for (let i = start; i < start + count; i++) {
            result.push(i);
        }
        return result;
    }

    static toMap<TKey, TValue>(source: TValue[], keySelector: (value: TValue) => TKey): Map<TKey, TValue> {
        const map: Map<TKey, TValue> = new Map();
        for (const value of source) {
            const key = keySelector(value);
            map.set(key, value);
        }

        return map;
    }

    static min<TValue>(source: TValue[], numberSelector: (value: TValue) => number): TValue | null {
        if (!source || source.length === 0) {
            return null;
        }
        return source.reduce((a, c) => numberSelector(c) < numberSelector(a) ? c : a);
    }

    static shuffle<TValue>(source: TValue[]): TValue[] {
        return [...source].sort(() => Math.random() - 0.5);
    }
}