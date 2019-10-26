import { Line, Shape, nextDirection, Arrow, Square, LeftHook, RightHook, RightZag, LeftZag } from "./Shape";
import { Point, random } from "../Utils";
import { range, toMap } from "../../Helpers/ArrayHelpers";
import { getType } from "../../Helpers/ObjectHelpers";

const shapeTypes = [
    Line,
    Arrow,
    Square,
    LeftHook,
    RightHook,
    LeftZag,
    RightZag
];

function pointToKey(point: Point): string {
    return `${point.x}_${point.y}`
}

export interface ScoreAnswer {
    type: "score",
    score: number;
}

export interface EndAnswer {
    type: "end"
}

export interface EmptyAnswer {
    type: "empty"
}

export type Answer = ScoreAnswer | EndAnswer | EmptyAnswer;

export class Board {
    public shape: Shape;
    public filled: Map<string, Point> = new Map();
    public ground: Map<string, Point>;
    public walls: Map<string, Point>;

    constructor(private width: number, private height: number) {
        const ground = range(0, width + 1).map(x => ({ x, y: height + 1 }));
        this.ground = toMap(ground, pointToKey);
        const walls = range(0, height + 1).map(y => ({ x: -1, y })).concat(range(0, height + 1).map(y => ({ x: width, y })));
        this.walls = toMap(walls, pointToKey);
        this.shape = this.nextShape();
    }

    public drop = (): Answer => {
        const type = getType(this.shape);
        const next = new type(this.shape.x, this.shape.y + 1, this.shape.direction);

        if (!this.hasCollision(next, this.filled) && !this.hasCollision(next, this.ground)) {
            this.shape = next;
            return { type: "empty" }
        }

        this.fill(this.shape);
        const fullLines = this.getFullLines(Array.from(new Set(this.shape.points.map(p => p.y))));
        this.shape = this.nextShape();

        if (fullLines.length > 0) {
            this.filled = this.remove(fullLines);
            return { type: "score", score: fullLines.length }
        }

        return {type: "end"}
    }

    private getFullLines = (lineInexes: number[]) => {
        const filledPoints = Array.from(this.filled.values());
        return lineInexes
            .map(y => filledPoints.filter(p => p.y === y))
            .filter(l => l.length === this.width)
            .reduce<number[]>((a, c) => [...a, c[0].y], []);
    }

    public move = (side: "left" | "right") => {
        const dx = side === "left" ? -1 : 1;
        const type = getType(this.shape);
        const next = new type(this.shape.x + dx, this.shape.y, this.shape.direction);
        if (!this.hasCollision(next, this.filled) && !this.hasCollision(next, this.walls)) {
            this.shape = next
        }
    }

    public rotate = () => {
        const direction = nextDirection(this.shape.direction)
        const type = getType(this.shape);
        const next = new type(this.shape.x, this.shape.y, direction);
        if (!this.hasCollision(next, this.filled) && !this.hasCollision(next, this.walls)) {
            this.shape = next
        }
    }

    private nextShape = (): Shape => {
        const index = random(0, shapeTypes.length);
        const type = shapeTypes[index];
        return new type(Math.floor(this.width / 2), 0, "down");
    }

    private hasCollision = (shape: Shape, map: Map<string, Point>): boolean => {
        const keys = shape.points.map(pointToKey);
        return keys.some(k => map.has(k));
    }

    private fill = (shape: Shape) => {
        const keyToPoints = shape.points.map(point => ({ point, key: pointToKey(point) }))
        for (const { key, point } of keyToPoints) {
            this.filled.set(key, point)
        }
    }

    private remove = (lines: number[]) => {
        const [min, max] = lines.reduce(([min, max], c) => [c < min ? c : min, c > max ? c : max], [this.height + 1, 0 ]);
        const points = Array.from(this.filled.values())
            .filter(p => p.y > max || p.y < min)
            .map(p => p.y < min ? { x: p.x, y: p.y + lines.length } : p);
        return toMap(points, pointToKey);
    }
}