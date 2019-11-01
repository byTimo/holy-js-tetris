export interface Point {
    x: number;
    y: number;
}

export interface Scale {
    width: number;
    height: number;
}

export interface Rect {
    kind: "rect";
    start: Point;
    scale: Scale;
}

export interface Circle {
    kind: "circle";
    center: Point;
    radious: number;
}

export type Figure = Rect | Circle;

export class MathHelper {
    static hasCollision(a: Figure, b: Figure): boolean {
        switch (a.kind) {
            case "circle":
                return MathHelper.hasCollisionWithCircle(a, b);
            case "rect":
                return MathHelper.hasCollisionWithRect(a, b);
        }
    }

    static hasCollisionWithRect(a: Rect, b: Figure): boolean {
        switch (b.kind) {
            case "rect":
                const hasHorisontal = a.start.x + a.scale.width >= b.start.x && b.start.x + b.scale.width >= a.start.x;
                const hasVertical = a.start.y + a.scale.height >= b.start.y && b.start.y + b.scale.height >= a.start.y;
                return hasHorisontal && hasVertical;
            case "circle":
                const x = a.start.x > b.center.x ? a.start.x : a.start.x + a.scale.width < b.center.x ? a.start.x + a.scale.width : b.center.x;
                const y = a.start.y > b.center.y ? a.start.y : a.start.y + a.scale.height < b.center.y ? a.start.y + a.scale.height : b.center.y;
                const distance = MathHelper.distance(b.center, { x, y });
                return distance <= b.radious;
        }
    }

    static hasCollisionWithCircle(a: Circle, b: Figure): boolean {
        switch (b.kind) {
            case "rect":
                return MathHelper.hasCollisionWithRect(b, a);
            case "circle":
                const distance = MathHelper.distance(a.center, b.center);
                return distance <= a.radious + b.radious;
        }
    }

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
