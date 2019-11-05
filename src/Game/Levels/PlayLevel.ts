import { GameContext, GameController, Level } from "../../GameTypes";
import { MathHelper, Scale } from "../../Helpers/MathHelpers";
import { CodeLine } from "../Objects/CodeLine";
import { ArrayHelper } from "../../Helpers/ArrayHelpers";
import { SaveLine } from "../Objects/SaveLine";
import { PissingRag } from "../Objects/PissingRag";
import { GameObject } from "../Objects/GameObject";
import { StartLevel } from "./StartLevel";
import { TextButton } from "../Objects/TextButton";
import { CodeTask, CodeTaskLine } from "../../Tasks/Types";
import { tasks } from "../../Tasks";
import { Label } from "../Objects/Label";
import { ObjectHelper } from "../../Helpers/ObjectHelpers";
import { TaskSummary } from "../Objects/TaskSummary";
import { ResultLevel } from "./ResultLevel";

const littlePartInLine = 5;
const centerLine = 3;
const lineWidthMultiplyer = 0.25;

export class PlayLevel extends Level {
    private tries = 3;
    public lines: CodeLine[] = [];
    public savedLines: SaveLine[];
    public rag: PissingRag;
    public readonly controlled: Map<GameController, GameObject> = new Map();
    public end: TextButton;
    public funcTitleLabel: Label;
    public funcCloseLabel: Label;
    public task: CodeTask;
    public taskSummary: TaskSummary;

    private taskLines: CodeTaskLine[] = [];
    private code: string = "";

    constructor(private scale: Scale) {
        super();
        this.task = tasks["js"][MathHelper.random(0, tasks["js"].length)];
        const part = scale.height / (12 * littlePartInLine + 13)
        const lineScale = { width: scale.width * lineWidthMultiplyer, height: part * littlePartInLine };
        this.funcTitleLabel = new Label(this.task.title, { x: scale.width * 0.6, y: part * centerLine + part }, lineScale);
        this.funcCloseLabel = new Label("}", { x: scale.width * 0.6, y: scale.height - part - part * (centerLine - 1) }, lineScale)
        this.savedLines = ArrayHelper.range(1, 10).map((x) => new SaveLine({ x: scale.width * 0.6, y: part + x * (part + lineScale.height) + centerLine * part }, lineScale));
        const ragScale = MathHelper.scale(scale, 0.03);
        this.rag = new PissingRag({ x: scale.width - ragScale.width - 10, y: ragScale.width + 10 }, ragScale);
        const endScale = MathHelper.scale(scale, 0.1);
        this.end = new TextButton("3/3", { x: scale.width - endScale.width / 2 - 10, y: scale.height - endScale.height / 2 - 10 }, endScale);
        const taskSummaryScale = { width: scale.width * 0.1, height: scale.height * 0.2 };
        this.taskSummary = new TaskSummary(this.task, { x: scale.width - taskSummaryScale.width / 2 - 10, y: scale.height - 20 - endScale.height - taskSummaryScale.height / 2 }, taskSummaryScale);
    }

    invoke = (context: GameContext): Level => {
        if (this.tries <= 0) {
            return new ResultLevel(this.scale, false, this.task, this.code, this.taskSummary.lastResult);
        }

        if (this.end.active.active) {
            const [end, result, code] = this.tryExcuteTask();
            if (end) {
                return new ResultLevel(this.scale, true, this.task, code, result);
            } else {
                this.tries = this.tries - 1;
                const endScale = MathHelper.scale(this.scale, 0.1);
                this.end = new TextButton(`${this.tries}/3`, { x: this.scale.width - endScale.width / 2 - 10, y: this.scale.height - endScale.height / 2 - 10 }, endScale)
                this.end.active.drop();
                this.taskSummary.lastResult = result;
                this.code = code;
            }
        }


        if (this.lines.length === 0 || this.lines[0].position.y > 50) {
            const scale = { width: this.scale.width * 0.25, height: this.scale.height * 0.05 };
            const line = new CodeLine(this.nextText(), { x: scale.width / 2 + 10, y: scale.height / 2 - this.scale.height * 0.02 }, scale);
            this.lines.unshift(line);
        }

        this.processControlledObjects();
        const freeControllers = context.controllers.filter(x => !this.controlled.has(x));
        this.processCodeLine(freeControllers);
        this.processSaveLine();
        this.processRag(freeControllers);
        this.processEnd(freeControllers);

        return this;
    }

    private tryExcuteTask = (): [boolean, any, string] => {
        const codes = this.savedLines.filter(x => x.line != null).map(x => x.line!.line.code);
        const code = [this.task.header, ...codes, "}"].join("\n");
        try {
            eval(code);
            var func: Function = (window as any).func;
            if (!func) {
                throw new Error("No func")
            };
            const actualResult = func.apply(null, this.task.args);
            return [ObjectHelper.isEquals(actualResult, this.task.result), actualResult, code];

        } catch (e) {
            return [false, "error", code];
        }
    }

    private processControlledObjects = () => {
        for (const [controller, obj] of this.controlled.entries()) {
            if (MathHelper.hasCollision(controller.collider, obj.collider)) {
                obj.active.inc();
                obj.position = controller.position;
            } else {
                if (!obj.active.dec() && obj.active.empty) {
                    this.controlled.delete(controller);
                }
            }
        }
    }

    private processCodeLine = (controllers: GameController[]) => {
        this.lines = this.lines.filter(x => {
            if (x.position.y >= this.scale.height) {
                return false;
            }
            const controller = controllers.find(c => MathHelper.hasCollision(c.collider, x.collider));
            if (controller) {
                if (x.active.inc()) {
                    this.controlled.set(controller, x);
                    return false;
                } else {
                    x.position = { x: x.position.x, y: x.position.y + 1 };
                    return true;
                }
            } else {
                x.active.dec();
                x.position = { x: x.position.x, y: x.position.y + 1 };
                return true;
            }
        })
    }

    private processSaveLine = () => {
        const controlled = Array.from(this.controlled.entries());
        for (const save of this.savedLines.filter(x => x.line == null)) {
            const pair = controlled.find(([c, l]) => MathHelper.hasCollision(c.collider, save.collider));
            if (pair && pair[1] instanceof CodeLine) {
                if (save.active.inc()) {
                    save.line = pair[1]
                    this.controlled.delete(pair[0]);
                }
            } else {
                save.active.dec();
            }
        }
    }

    private processRag = (controllers: GameController[]) => {
        for (const saved of this.savedLines) {
            if (MathHelper.hasCollision(saved.collider, this.rag.collider)) {
                saved.line = null;
            }
        }

        if (this.rag.active.active) {
            return;
        }

        const controller = controllers.find(c => MathHelper.hasCollision(c.collider, this.rag.collider));
        if (controller) {
            if (this.rag.active.inc()) {
                this.controlled.set(controller, this.rag);
            }
        } else {
            this.rag.active.dec();
        }
    }

    private processEnd = (controllers: GameController[]) => {
        const controller = controllers.find(c => MathHelper.hasCollision(c.collider, this.end.collider))
        if (controller) {
            this.end.active.inc();
        } else {
            this.end.active.dec();
        }
    }

    private nextText = (): CodeTaskLine => {
        if (this.taskLines.length === 0) {
            this.taskLines = ArrayHelper.shuffle(this.task.lines);
        }
        return this.taskLines.pop()!;
    }
}