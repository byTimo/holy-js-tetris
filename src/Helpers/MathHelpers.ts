export interface Point {
    x: number;
    y: number;
}

export interface Scale {
    width: number;
    height: number;
}

export class MathHelper {
    static distance({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): number {
        const dx = x2 - x1, dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static random(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }
}
