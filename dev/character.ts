/**
 * Character
 */
class Character {

    public player:HTMLElement;

    private downkey : number;
    private upkey : number;
    private leftkey : number;
    private rightkey : number;

    private spacebar: number;
    private lastKey: number = 0;
    public bulletArray = [];

    private leftSpeed : number = 0;
    private rightSpeed : number = 0;
    private downSpeed : number = 0;
    private upSpeed : number = 0;

    public x : number;
    public y : number;
    public width: number;
    public height: number;

    public sound: any;

    private start:Start;

    public timer:number;
    public counter:number = 0;

    constructor(s:Start, left:number, right:number, up:number, down:number, spacebar:number) {
        this.start = s;

        this.player = document.createElement("player");
        document.body.appendChild(this.player);

        this.upkey = up;
        this.downkey = down;
        this.leftkey = left;
        this.rightkey = right;

        this.spacebar = spacebar;


        this.width = 50;
        this.height = 50;
        this.x = 20;
        this.y = 400;

        window.addEventListener("keydown", this.onKeyDown.bind(this));
        window.addEventListener("keyup", this.onKeyUp.bind(this));
 
    }

    private onKeyDown(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 10;
            break;
        case this.downkey:
            this.downSpeed = 10;
            break;
        case this.leftkey:
            this.leftSpeed = 10;
            this.lastKey = 1;
            break;
        case this.rightkey:
            this.rightSpeed = 10;
            this.lastKey = 0;
            break;
        case this.spacebar:
                        this.sound = new Howl({
  urls: ['sounds/shot.mp3']
}).play();
            this.addBullet();
            console.log("spacebar clicked!");
            break;
        }
    }

    public addBullet() {
        let b = new Bullet(this.x, this.y, this.lastKey);
        this.start.addBullet(b);
    }
    
    // speed op 0 alleen als de eigen keys zijn losgelaten
    private onKeyUp(event:KeyboardEvent):void {
        switch(event.keyCode){
        case this.upkey:
            this.upSpeed = 0;
            break;
        case this.downkey:
            this.downSpeed = 0;
            break;
        case this.leftkey:
            this.leftSpeed = 0;
            break;
        case this.rightkey:
            this.rightSpeed = 0;
            break;
        }
    }

    public move() : void {
        
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;

                if( this.x + 40 > window.innerWidth || this.x < 0) { 
            this.x *= -1;
        }
        
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.y *= -1;
        }
                        
        // de div positie aanpassen met transform - tip: scaleX kan je gebruiken om de andere kant op te kijken
        if (this.lastKey == 0) {
            this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        }
        else if (this.lastKey == 1) {
            this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
        }
    
    }

    public removeInstance() {
        document.body.removeChild(this.player);
    }

    public removeChar() {
        this.player.remove();
    }

    public flick() {
        this.timer = setInterval(this.flicker.bind(this), 250);
    }

    public flicker() {
            this.counter++;
            console.log("player " + this.counter);
            
            if(this.counter == 1){
                this.player.remove();
            }
            if(this.counter == 2){
                document.body.appendChild(this.player);
            }
            if(this.counter == 3){
                this.player.remove();
            }
            if(this.counter == 4){
                document.body.appendChild(this.player);
                clearInterval(this.timer);
            }
    }



}