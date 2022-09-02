import { GAME_WIDTH, PIPE_DISTANCE } from "../config/config";
import { Game } from "../game/game";
import { GameObject } from "./game-object";

export class Score extends GameObject {
    constructor(game: Game, imagePath: string) {
        super(game, imagePath);
        this.position = {
            x:140,
            y:80,
        }
    }

    update():void {
        const ScoreArray  = Array.from(String(this.game.numberScore));

        for(let i=0; i<ScoreArray.length; i++) {
    

            this.image = new Image();
            this.image.src = `./assets/img/${ScoreArray[i]}.png`;
            this.game.context.drawImage(this.image, this.position.x+i*20, this.position.y);
        }

    
    }
}