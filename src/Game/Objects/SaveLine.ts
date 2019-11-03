import { GameObject } from "./GameObject";
import { CodeLine } from "./CodeLine";
import { Activation } from "../../Activation";
import { Rect, MathHelper } from "../../Helpers/MathHelpers";

export class SaveLine extends GameObject {
    public line: CodeLine | null = null;

    public active: Activation = new Activation(0, 40, 40);

    public get collider(): Rect {
        return {
            kind: "rect",
            start: MathHelper.start(this.position, this.scale),
            scale: this.scale
        };
    }
}
