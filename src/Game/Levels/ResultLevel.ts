import { Level, GameContext } from "../../GameTypes";
import { Scale, MathHelper } from "../../Helpers/MathHelpers";
import { CodeTask } from "../../Tasks/Types";
import { TaskSummary } from "../Objects/TaskSummary";
import { Label } from "../Objects/Label";
import { Button } from "../Objects/Button";
import { StartLevel } from "./StartLevel";

export class ResultLevel extends Level {
    public title: Label;
    public summary: TaskSummary;
    public codeLabel: Label;
    public button: Button;

    constructor(private scale: Scale, private win: boolean, private task: CodeTask, private code: string, private result: any) {
        super();
        const titleScale = { width: scale.width * 0.5, height: scale.height * 0.2 };
        this.title = new Label(win ? "Win" : "Lose", { x: titleScale.width, y: titleScale.height / 2 + 10 }, titleScale);
        const summeryScale = { width: scale.width * 0.25, height: scale.height * 0.5 };
        this.summary = new TaskSummary(task, MathHelper.add(this.title.position, { x: -summeryScale.width, y: summeryScale.height / 2 + 10 }), summeryScale);
        this.summary.lastResult = result;
        const codeLabelScale = { width: scale.width * 0.25, height: scale.height * 0.5 }
        this.codeLabel = new Label(code, MathHelper.add(this.title.position, { x: codeLabelScale.width, y: codeLabelScale.height / 2 + 10 }), codeLabelScale);
        const buttonScale = { width: scale.width * 0.03, height: scale.width * 0.1 };
        this.button = new Button(MathHelper.add(this.summary.position, { x: summeryScale.width, y: summeryScale.height / 2 + buttonScale.height / 2 + 10 }), buttonScale);
    }

    invoke = (context: GameContext): Level => {
        const controller = context.controllers.find(x => MathHelper.hasCollision(x.collider, this.button.collider))
        if (controller) {
            this.button.active.inc();
        } else {
            this.button.active.dec();
        }

        return this.button.active.active ? new StartLevel(this.scale) : this;
    }
}