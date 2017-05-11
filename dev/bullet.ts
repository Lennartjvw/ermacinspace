/**
 * bullet
 */
class Bullet {

    private bullet:HTMLElement;
    public x:number;
    public y:number;
    public width:number;
    public height:number;

    private bulletSpeed: number;
    private bulletDirection : number = 1;
    private lastKey: number;

    private startPositionX: number;


    constructor(x: number, y: number, lastKey: number) {
        
        this.bullet = document.createElement("bullet");
        document.body.appendChild(this.bullet);

        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;

        this.startPositionX = x;
        this.lastKey = lastKey;

        requestAnimationFrame(this.gameLoop.bind(this));

    }

    private gameLoop() {
        this.bulletMove();
        requestAnimationFrame(this.gameLoop.bind(this));
    }

    private bulletMove() {
        if (this.lastKey == 0) {
            this.bulletSpeed = 20;
            this.bulletDirection = 1;
        }
        if (this.lastKey == 1) {
            this.bulletDirection = -1;
            this.bulletSpeed = -20;
            // TODO dit moet this.posX zijn
            //this.bullet.style.left = "15px";
        }

        this.x += this.bulletSpeed;

        this.bullet.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX("+this.bulletDirection+")";

        if (this.x > window.innerWidth || this.x > this.startPositionX + 500 || this.x < 0 || this.x < this.startPositionX - 500) {
            // div weg
            this.bullet.remove();
            //this.bullet = null;
            // maar hele bullet instance moet ook nog weg
        }

    
}
}