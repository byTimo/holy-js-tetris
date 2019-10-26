import { Point } from "../Utils";
import { range } from "../../Helpers/ArrayHelpers";

export type ShapeDirection = "up" | "right" | "down" | "left";

export function nextDirection(direction: ShapeDirection): ShapeDirection {
    switch (direction) {
        case "left": return "up";
        case "up": return "right";
        case "right": return "down";
        case "down": return "left";
    }
}

function isHorisontal(direction: ShapeDirection): boolean {
    return direction === "left" || direction === "right";
}

export abstract class Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection,
        public readonly points: Point[]
    ) {
    }
}

export class Square extends Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, [
            { x, y },
            { x: x + 1, y },
            { x, y: y + 1 },
            { x: x + 1, y: y + 1 }
        ])
    }
}

export class Line extends Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, Line.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        const diffs = direction === "down" || direction === "right" ? range(-1, 4) : range(-2, 4);
        return isHorisontal(direction)
            ? diffs.map(dx => ({ x: x + dx, y }))
            : diffs.map(dy => ({ x, y: y + dy }))
    }
}

export class Arrow extends Shape {
    private static readonly pointDiffByDirection = {
        "left": { x: -1, y: 0 },
        "right": { x: 1, y: 0 },
        "up": { x: 0, y: -1 },
        "down": { x: 0, y: 1 }
    }

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, Arrow.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        const { x: dx, y: dy } = Arrow.pointDiffByDirection[direction];
        const diffs = range(-1, 3);
        return [
            ...(isHorisontal(direction)
                ? diffs.map(dy => ({ x, y: y + dy }))
                : diffs.map(dx => ({ x: x + dx, y }))
            ),
            { x: x + dx, y: y + dy }
        ]
    }
}

export class RightHook extends Shape {
    private static readonly pointDiffByDirection = {
        "left": { x: -1, y: 1 },
        "right": { x: 1, y: -1 },
        "up": { x: -1, y: -1 },
        "down": { x: 1, y: 1 }
    }

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, RightHook.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        const { x: dx, y: dy } = RightHook.pointDiffByDirection[direction];
        const diffs = range(-1, 3);
        return [
            ...(isHorisontal(direction)
                ? diffs.map(dx => ({ x: x + dx, y }))
                : diffs.map(dy => ({ x, y: y + dy }))
            ),
            { x: x + dx, y: y + dy }
        ]
    }
}

export class LeftHook extends Shape {
    private static readonly pointDiffByDirection = {
        "left": { x: -1, y: -1 },
        "right": { x: 1, y: 1 },
        "up": { x: 1, y: -1 },
        "down": { x: -1, y: 1 }
    }

    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, LeftHook.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        const { x: dx, y: dy } = LeftHook.pointDiffByDirection[direction];
        const diffs = range(-1, 3);
        return [
            ...(isHorisontal(direction)
                ? diffs.map(dx => ({ x: x + dx, y }))
                : diffs.map(dy => ({ x, y: y + dy }))
            ),
            { x: x + dx, y: y + dy }
        ]
    }
}

export class LeftZag extends Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, LeftZag.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        return isHorisontal(direction)
            ? [
                { x, y },
                { x: x + 1, y },
                { x, y: y - 1 },
                { x: x - 1, y: y - 1 }
            ]
            : [
                { x, y },
                { x, y: y - 1 },
                { x: x - 1, y },
                { x: x - 1, y: y + 1 }
            ]
    }
}

export class RightZag extends Shape {
    constructor(
        public readonly x: number,
        public readonly y: number,
        public readonly direction: ShapeDirection
    ) {
        super(x, y, direction, RightZag.getPoints(x, y, direction))
    }

    private static getPoints = (x: number, y: number, direction: ShapeDirection) => {
        return isHorisontal(direction)
            ? [
                { x, y },
                { x: x + 1, y },
                { x, y: y + 1 },
                { x: x - 1, y: y + 1 }
            ]
            : [
                { x, y },
                { x, y: y + 1 },
                { x: x - 1, y },
                { x: x - 1, y: y - 1 }
            ]
    }
}