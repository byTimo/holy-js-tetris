import { GameMiddleware, GameContext, GameController, Level } from "../../GameTypes";
import { MathHelper, Scale } from "../../Helpers/MathHelpers";
import { CodeLine } from "../CodeLine";
import { ArrayHelper } from "../../Helpers/ArrayHelpers";
import { SaveLine } from "../SaveLine";
import { PissingRag } from "../PissingRag";
import { GameObject } from "../GameObject";
import { Trash } from "../Trash";

export class PlayLevel extends Level {
    public lines: CodeLine[] = [];
    public savedLines: SaveLine[];
    public rag: PissingRag;
    public trash: Trash;
    public readonly linkedControllers: Map<GameController, GameObject> = new Map();

    constructor(private scale: Scale) {
        super();
        this.savedLines = ArrayHelper.range(0, 10).map((x) => new SaveLine({ x: scale.width / 2, y: x * scale.height / 11 + 25 }));
        this.rag = new PissingRag({ x: scale.width - 50, y: 50 });
        this.trash = new Trash({ x: scale.width / 5, y: scale.height - 100 });
    }

    invoke = (context: GameContext): Level => {
        for (const [controller, obj] of this.linkedControllers.entries()) {
            if (MathHelper.hasCollision(controller.collider, obj.collider)) {
                obj.active.inc();
                obj.position = controller.position;
                const savedLines = this.savedLines.find(x => MathHelper.hasCollision(x.collider, controller.collider));
                if (savedLines) {
                    if (savedLines.line == null && obj instanceof CodeLine) {
                        if (savedLines.active.inc()) {
                            savedLines.line = obj;
                            this.linkedControllers.delete(controller);
                        }
                    } else if (obj instanceof PissingRag) {
                        savedLines.line = null;
                    }
                } else if (MathHelper.hasCollision(this.trash.collider, obj.collider)) {
                    this.linkedControllers.delete(controller);
                }
            } else {
                if (!obj.active.dec()) {
                    this.linkedControllers.delete(controller);
                }
            }
        }

        if (this.lines.length === 0 || this.lines[0].position.y > 50) {
            const line = new CodeLine(this.nextText(), { x: 150, y: 10 });
            this.lines.unshift(line);
        }

        for (const controller of context.controllers) {
            if (this.linkedControllers.has(controller)) {
                continue;
            }

            if (MathHelper.hasCollision(controller.collider, this.rag.collider)) {
                if (this.rag.active.inc()) {
                    this.linkedControllers.set(controller, this.rag);
                }
            }

            const line = this.lines.find(x => MathHelper.hasCollision(x.collider, controller.collider));
            if (line) {
                if (line.active.inc()) {
                    this.linkedControllers.set(controller, line);
                }
            }
        }

        this.lines = this.lines.filter(x => !x.active.active);

        this.lines.forEach(x => x.setPosition({ x: x.position.x, y: x.position.y + 0.5 }));

        return this;
    }

    private nextText = (): string => {
        return "lalka";
    }
}