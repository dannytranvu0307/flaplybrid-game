import { GAME_WIDTH, PIPE_DISTANCE } from "../config/config";
import { Game } from "../game/game";
import { GameObject } from "./game-object";

export class Pipe extends GameObject {
    images: HTMLImageElement[] = [];
    constructor(game: Game,  imageUp: string, imageDown: string) {
        super(game, imageUp);
        const imageDownElement = new Image();
        imageDownElement.src = imageDown;
        this.images = [this.image, imageDownElement];
        this.position = {
            x: GAME_WIDTH,
            y: -150,
        }

    }
    update(): void {
       
        if (!this.game.isCollision) {
            this.position.x -= 1;
            
        }
        if (this.position.x === -52) {
            this.position.x = GAME_WIDTH
            this.position.y = -Math.floor(Math.random() * 320);
        }
 
        this.game.context.drawImage(this.images[0], this.position.x, this.position.y);
        
        this.game.context.drawImage(this.images[1], this.position.x, this.position.y + 320 + PIPE_DISTANCE);
    }


}   