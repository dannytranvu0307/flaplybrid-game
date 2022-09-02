import { Game } from "../game/game";
import { GameObject } from "./game-object";

export class GameStart extends GameObject {
    constructor(game: Game, imagePath: string) {
        super(game, imagePath);
        this.position = {
            x: 50,
            y: 100,
        }

    }

    update(): void {
        this.game.context.drawImage(this.image, this.position.x, this.position.y);
    }

}