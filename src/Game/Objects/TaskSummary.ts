import { GameObject } from "./GameObject";
import { CodeTask } from "../../Tasks/Types";
import { Point, Scale, Empty } from "../../Helpers/MathHelpers";
import { Activation } from "../../Activation";

export class TaskSummary extends GameObject {
    public readonly active = Activation.empty();

    public lastResult: any = null;

    constructor(public task: CodeTask, position: Point, scale: Scale) {
        super(position, scale);
    }

    public get collider(): Empty {
        return {
            kind: "empty"
        }
    }
}