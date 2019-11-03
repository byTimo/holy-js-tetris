import { GameMiddleware, GameContext, GameController, Level } from "../../GameTypes";
import { MathHelper, Scale } from "../../Helpers/MathHelpers";
import { CodeLine } from "../Objects/CodeLine";
import { ArrayHelper } from "../../Helpers/ArrayHelpers";
import { SaveLine } from "../Objects/SaveLine";
import { PissingRag } from "../Objects/PissingRag";
import { GameObject } from "../Objects/GameObject";
import { StartLevel } from "./StartLevel";
import { TextButton } from "../Objects/TextButton";
import { Task, Line } from "../../Tasks/Types";
import { tasks, lines } from "../../Tasks";
import { Label } from "../Objects/Label";

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
    public task: Task;
    public taskLines: Line[];

    constructor(private scale: Scale) {
        super();
        this.task = tasks["js"][MathHelper.random(0, tasks["js"].length)];
        this.taskLines = lines["js"];
        const part = scale.height / (12 * littlePartInLine + 13)
        const lineScale = { width: scale.width * lineWidthMultiplyer, height: part * littlePartInLine };
        this.funcTitleLabel = new Label(this.task.title, { x: scale.width / 2, y: part * centerLine + part }, lineScale);
        this.funcCloseLabel = new Label("}", { x: scale.width / 2, y: scale.height - part - part * (centerLine - 1) }, lineScale)
        this.savedLines = ArrayHelper.range(1, 10).map((x) => new SaveLine({ x: scale.width / 2, y: part + x * (part + lineScale.height) + centerLine * part }, lineScale));
        const ragScale = MathHelper.scale(scale, 0.03);
        this.rag = new PissingRag({ x: scale.width - ragScale.width - 10, y: ragScale.width + 10 }, ragScale);
        const endScale = MathHelper.scale(scale, 0.1);
        this.end = new TextButton("3/3", { x: scale.width - endScale.width / 2 - 10, y: scale.height - endScale.height / 2 - 10 }, endScale);
    }

    invoke = (context: GameContext): Level => {
        if (this.lines.length === 0 || this.lines[0].position.y > 50) {
            const part = this.scale.height / 12 / 11;
            const scale = { width: this.scale.width * 0.25, height: part * 5 };
            const line = new CodeLine(this.nextText(), { x: scale.width / 2 + 10, y: scale.height / 2 }, scale);
            this.lines.unshift(line);
        }

        this.processControlledObjects();
        const freeControllers = context.controllers.filter(x => !this.controlled.has(x));
        this.processCodeLine(freeControllers);
        this.processSaveLine();
        this.processRag(freeControllers);
        this.processEnd(freeControllers);

        return this.end.active.active ? new StartLevel(this.scale) : this;
    }

    private processControlledObjects = () => {
        for (const [controller, obj] of this.controlled.entries()) {
            if (MathHelper.hasCollision(controller.collider, obj.collider)) {
                obj.active.inc();
                obj.position = controller.position;
            } else {
                if (!obj.active.dec()) {
                    this.controlled.delete(controller);
                }
            }
        }
    }

    private processCodeLine = (controllers: GameController[]) => {
        this.lines = this.lines.filter(x => {
            const controller = controllers.find(c => MathHelper.hasCollision(c.collider, x.collider));
            if (controller) {
                this.controlled.set(controller, x);
                return false;
            }
            if (x.position.y >= this.scale.height) {
                return false;
            }
            x.active.dec();
            x.position = { x: x.position.x, y: x.position.y + 0.5 };
            return true;
        })
    }

    private processSaveLine = () => {
        const controlled = Array.from(this.controlled.entries());
        for (const save of this.savedLines.filter(x => x.line == null)) {
            const pair = controlled.find(([c, l]) => MathHelper.hasCollision(l.collider, save.collider));
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

    private nextText = (): Line => {
        return this.taskLines[MathHelper.random(0, this.taskLines.length)];
    }
}