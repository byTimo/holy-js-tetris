import { ArrayHelper } from "../Helpers/ArrayHelpers";
import { ObjectHelper } from "../Helpers/ObjectHelpers";
import { MathHelper } from "../Helpers/MathHelpers";
import { GameContext } from "../GameTypes";
import { HandGameController, HandDetection } from "./Types";

const distanceTreshold = 150;

export class HandControllerProvider {
    invoke(context: GameContext): void {
        const handDetections = ObjectHelper.filterByType(context.detection, HandDetection);
        const handControllers = ObjectHelper.filterByType(context.controllers, HandGameController);
        const pairs = this.joinControllers(handControllers, handDetections);
        context.controllers = pairs.map(x => x[1]);
    }

    private joinControllers = (controllers: HandGameController[], hands: HandDetection[]) => {
        const aliving = hands.map<[HandDetection | null, HandGameController]>(h => {
            const joined = this.join(h, controllers);
            if (!joined) {
                return [h, ObjectHelper.create(HandGameController, { position: h.position })];
            }
            joined.life.inc();
            return [h, joined.life.active ? joined.setPosition(h.position) : joined]
        });

        const joinedMap = ArrayHelper.toMap(aliving, x => x[1]);
        const dying = controllers
            .filter(c => !joinedMap.has(c))
            .map(x => {x.life.dec(); return x})
            .filter(x => x.life.score > 0)
            .map<[HandDetection | null, HandGameController]>(c => [null, c])
        return aliving.concat(dying);
    }

    private join = (hand: HandDetection, controllers: HandGameController[]): HandGameController | null => {
        const filteredPairs = controllers
            .map<[number, HandGameController]>(c => [MathHelper.distance(c.position, hand.position), c])
            .filter(([d]) => d <= distanceTreshold);

        const min = ArrayHelper.min(filteredPairs, x => x[0]);
        return min != null ? min[1] : null
    }
}