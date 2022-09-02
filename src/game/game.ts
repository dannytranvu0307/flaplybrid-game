import { GAME_FPS, GAME_HEIGHT, GAME_WIDTH, PIPE_DISTANCE , PIPE_WID} from "../config/config";
import { BackGround } from "../object-game/background";
import { Base } from "../object-game/base";
import { Bird } from "../object-game/bird";
import { Pipe } from "../object-game/pipe";
import { Score } from "../object-game/score";
import { Gameover } from "../object-game/game_over";
import { GameStart } from "../object-game/start";

export class Game {

    context!: CanvasRenderingContext2D;
    bird!: Bird;
    bg!: BackGround;
    base!: Base;
    pipe!: Pipe;
    score!: Score;
    gameover!: Gameover;
    Gstart!: GameStart;
    numberScore:number = 0;
    isCollision: boolean = false;
    countFrame: number = 0;
    isEndGame: boolean = false;
    isStart: boolean = false;
    
    constructor(id: string) {
        const canvas = document.getElementById(id) as HTMLCanvasElement;
        this.context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = GAME_WIDTH;
        canvas.height = GAME_HEIGHT;

        canvas.addEventListener('click', () => {
            if (!this.isCollision) {
                this.bird.flap();
                console.log(this.numberScore)
            }
        })
        
        document.addEventListener('keyup', (event) => {
                if (event.code === 'Space' && !this.isCollision) {
                    this.bird.flap();
                }
            })

    }

    #checkCollision(): void {
        if ((this.bird.position.x + 34) < (this.pipe.position.x + 52) && (this.bird.position.x) > (this.pipe.position.x - 34)) {
            if (!(this.bird.position.y > this.pipe.position.y + 320 && this.bird.position.y < this.pipe.position.y + 320 + PIPE_DISTANCE)) {
                this.isCollision = true;
            }

        }

        if (this.bird.position.y >= 456 || this.bird.position.y <= 0) {
            this.isCollision = true;
        }
        if (this.bird.position.y >= 456) {
            this.isEndGame = true;
        }

        if(this.bird.position.x === this.pipe.position.x+ PIPE_WID){
            this.numberScore += 1;
            console.log(this.numberScore)
        }


    }

    #updateFrame(): void {
        // if(!this.isStart){
        //    this.gamestart.update();
        // }
        const audio = document.getElementById('music') as HTMLAudioElement;
      if (!this.isEndGame) {
        
            this.#checkCollision();    
            this.countFrame++;
            this.context.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            this.bg.update();
            this.pipe.update();
            this.base.update();
            this.bird.update();
            this.score.update();
            setTimeout(() => this.#updateFrame(), 1000 / GAME_FPS)
            audio.play();
        } else {
            this.Gstart.update()
          
        }


    }

    setBird(bird: Bird): void {
        this.bird = bird;
    }

    setBackground(bg: BackGround): void {
        this.bg = bg;
    }
    setBase(base: Base): void {
        this.base = base;
    }

    setPipe(pipe: Pipe): void {
        this.pipe = pipe;
    } 
    setScore(score: Score):void {
        this.score = score;
    
    }
    setGameover(gameover: Gameover):void {
        this.gameover = gameover;
    }
   setGamestart(gamestart: GameStart):void{
    this.Gstart = gamestart;
   }
    start(): void {
        this.#updateFrame();
    }


}