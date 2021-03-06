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

export interface Empty {
    kind: "empty";
}

export type Figure = Rect | Circle | Empty;

export class MathHelper {
    static hasCollision(a: Figure, b: Figure): boolean {
        switch (a.kind) {
            case "circle":
                return MathHelper.hasCollisionWithCircle(a, b);
            case "rect":
                return MathHelper.hasCollisionWithRect(a, b);
            case "empty":
                return false;
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
            case "empty":
                return false;
        }
    }

    static hasCollisionWithCircle(a: Circle, b: Figure): boolean {
        switch (b.kind) {
            case "rect":
                return MathHelper.hasCollisionWithRect(b, a);
            case "circle":
                const distance = MathHelper.distance(a.center, b.center);
                return distance <= a.radious + b.radious;
            case "empty":
                return false;
        }
    }

    static center(start: Point, scale: Scale): Point {
        return { x: start.x + scale.width / 2, y: start.y + scale.height / 2 };
    }

    static start(center: Point, scale: Scale): Point {
        return { x: center.x - scale.width / 2, y: center.y - scale.height / 2 };
    }

    static distance({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): number {
        const dx = x2 - x1, dy = y2 - y1;
        return Math.sqrt(dx * dx + dy * dy);
    }

    static add({ x: x1, y: y1 }: Point, { x: x2, y: y2 }: Point): Point {
        return { x: x1 + x2, y: y1 + y2 };
    }

    static random(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    static scale(scale: Scale, weight: number): Scale {
        return { width: scale.width * weight, height: scale.height * weight };
    }
}
