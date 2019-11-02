import { GameContext, GameMiddleware } from "./GameTypes";

export class LevelMiddleware implements GameMiddleware {
    invoke = (context: GameContext) => {
        context.level = context.level.invoke(context);
    };
}
