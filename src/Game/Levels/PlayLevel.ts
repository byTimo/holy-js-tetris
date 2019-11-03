import { GameMiddleware, GameContext, GameController, Level } from "../../GameTypes";
import { MathHelper, Scale } from "../../Helpers/MathHelpers";
import { CodeLine } from "../Objects/CodeLine";
import { ArrayHelper } from "../../Helpers/ArrayHelpers";
import { SaveLine } from "../Objects/SaveLine";
import { PissingRag } from "../Objects/PissingRag";
import { GameObject } from "../Objects/GameObject";
import { StartLevel } from "./StartLevel";
import { TextButton } from "../Objects/TextButton";

export class PlayLevel extends Level {
    private tries = 3;
    public lines: CodeLine[] = [];
    public savedLines: SaveLine[];
    public rag: PissingRag;
    public readonly controlled: Map<GameController, GameObject> = new Map();
    public end: TextButton;

    constructor(private scale: Scale) {
        super();
        this.savedLines = ArrayHelper.range(0, 10).map((x) => new SaveLine({ x: scale.width / 2, y: x * scale.height / 11 + 25 }));
        this.rag = new PissingRag({ x: scale.width - 50, y: 50 });
        this.end = new TextButton("3/3", { x: scale.width - 75, y: scale.height - 50 });
    }

    invoke = (context: GameContext): Level => {
        if (this.lines.length === 0 || this.lines[0].position.y > 50) {
            const line = new CodeLine(this.nextText(), { x: 150, y: 10 });
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

    private nextText = (): string => {
        return "lalka";
    }
}