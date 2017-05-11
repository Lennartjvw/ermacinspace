/**
 * Start
 */

/// <reference path="enemy.ts"/>
/// <reference path="timerscore.ts"/>

class Start {

    private char1:Character;
    public bullets: Array<Bullet> = new Array<Bullet>();
    private interface:InterFace;
    private enemy1: Array<Enemy> = new Array<Enemy>();
    private utils:Utils;
    private utilsbullet:UtilsBullet;
    public timer:TimerScore;
    private sound:any;

    private count = 0;
    private dmgcount = 0;

    constructor() {
        console.log("doorheen");
        this.sound = new Howl({
        urls: ['sounds/Platformer2.mp3']
        }).play();

        this.sound.play();

        this.timer = new TimerScore();

        this.interface = new InterFace();
        //this.timer = new TimerScore();
        this.char1 = new Character(this, 65, 68, 87, 83, 32);

        requestAnimationFrame(this.gameLoop.bind(this));


        for (var i = 0; i < 15; i++) {
            this.enemy1.push(new Green(this));
        }


        this.utils = new Utils();
        this.utilsbullet = new UtilsBullet();
        
    }

    public addBullet(b:Bullet){
        this.bullets.push(b);
    }

    private gameLoop(){
        for(let i=0; i<this.enemy1.length; i++){
          this.enemy1[i].draw();
        }
       this.char1.move();
       requestAnimationFrame(this.gameLoop.bind(this));
       this.updateElements();
       //this.updateElementsTwo();
    }

    private updateElements():void {
                
        // alle enemies
        for (var en of this.enemy1) {
            
            // per enmey check of je player raakt
            if(this.utils.hasOverlap(en, this.char1)) {
                en.hitEnemy();
                this.dmgcount++;
                // this.char1.flick();

                if(this.dmgcount == 1){
                    this.interface.getDamage75();
                    this.timer.minusScore();
                }

                if(this.dmgcount == 2){
                    this.interface.getDamage50();
                    this.timer.minusScore();
                    // this.char1.flick();
                }

                if(this.dmgcount == 3){
                    this.interface.getDamage25();
                    this.timer.minusScore();
                    // this.char1.flick();
                }

                if(this.dmgcount == 4){
                    this.interface.getDamage0();
                    this.timer.minusScore();
                    this.timer.stopTimer();
                    this.timer.addScore();
                    this.char1.removeChar();


                }
                

                this.removeFromArray(en);
                console.log("enemy hits character");
            }
            
            // elke kogel in de kogel array moet gechecked worden
            for(var bu of this.bullets) {

                if(this.utilsbullet.hasOverlapTwo(en, bu)) {
                    en.hitEnemy();
                    //
                    this.removeFromArray(en);
                    console.log("BULLET HITS ENEMY");
                    
                }
            }
        }
    }

    // private updateElementsTwo():void {
                
    //     for (var b of this.enemy1) {
            
    //         if(this.utilsbullet.hasOverlap(b, this.bullet)) {
    //             b.hitEnemy();
    //             this.removeFromArray(b);
    //             console.log("BULLET HIT");
                
    //         }
    //     }
    // }
    

    private removeFromArray(b:Enemy){
        console.log("but now remove " + b + " from array");

        for(let i = 0; i < this.enemy1.length; i++){

            if (this.enemy1[i] == b){
                console.log("enemy gevonden");
                this.enemy1.splice(i, 1);
                this.count++

                if(this.count == 15){
                    console.log("red added");
                    for (var x = 0; x < 20; x++) {
                        this.enemy1.push(new Red(this));
                    }
                }

                if(this.count == 35){
                    for (var x = 0; x < 30; x++) {
                        this.enemy1.push(new Green(this));
                        console.log("20 gehaald");
                }
                }

                if(this.count == 65){
                    for (var x = 0; x < 40; x++) {
                        this.enemy1.push(new Red(this));
                        console.log("30 gehaald");
                }
                    
                }

                if(this.count == 105){
                    for (var x = 0; x < 50; x++) {
                        this.enemy1.push(new Green(this));
                        console.log("40 gehaald");
                }
            }

                if(this.count == 155){
                    this.timer.stopTimer();
                    this.char1.removeInstance();
                    this.timer.addScoreTwo();
                }

            console.log(this.count);
            
        }

        
    }
    }

}