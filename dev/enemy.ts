/**
 * enemyDiv
 */
class Enemy {

    private enemyDiv:HTMLElement;

    public x : number;
    public y : number;

    public width: number;
    public height: number;

    public speedX : number;
    public speedY : number;

    public skin:string;

    private game:Start;

    constructor(g:Start, skin:string) {
        this.game = g;

        this.enemyDiv = document.createElement(skin);
        document.body.appendChild(this.enemyDiv);

        this.x = 1400;
        this.y = (Math.random() * (window.innerHeight/2)) + (window.innerHeight/4);

        this.speedX = Math.ceil(Math.random() * 50);
        this.speedY = Math.ceil(Math.random() * 50);

        this.width = 50;
        this.height = 50;

        this.move();
        this.draw();
        
    }

    public move() : void {

    }

    public hitEnemy(){
        console.log("the div is removed!");
        this.enemyDiv.remove();
    }

    public draw() : void {

        this.x += this.speedX;
        this.y += this.speedY;

        console.log("MOVE!");
        

        // als we buiten beeld gaan dan de snelheid omdraaien
        if( this.x + 40 > window.innerWidth || this.x < 0) { 
            this.speedX *= -1;
        }
        
        if( this.y + 40 > window.innerHeight || this.y < 0) { 
            this.speedY *= -1;
        }
        this.enemyDiv.style.transform = "translate("+this.x+"px, "+this.y+"px)";     
    }

}