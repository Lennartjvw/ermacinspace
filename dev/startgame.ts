/**
 * name
 */
class StartGame {

    public block:HTMLElement;
    public timer:number;
    public count:number = 0;

    constructor() {
        console.log("door");
        
        this.block = document.createElement("block");
        this.block.setAttribute("id", "blockdiv");
        this.block.style.width = "50px";
        this.block.style.height = "50px";
        this.block.style.backgroundColor = "red";
        document.body.appendChild(this.block);
        this.block.addEventListener("click", this.score.bind(this));

        this.timer = setInterval(this.counter.bind(this), 1000);
    
    }

    public counter() {
        this.count++;
        console.log(this.count);
        
        if(this.count == 2) {
        this.block.style.width = "100px";
        this.block.style.height = "100px";
        }

        if(this.count == 4) {
        this.block.style.width = "200px";
        this.block.style.height = "200px";
        }

        if(this.count == 6) {
        this.block.style.width = "400px";
        this.block.style.height = "400px";
        this.block.style.backgroundColor = "green";
        }


    }

    public score() {
            if(this.count > 6) {
                document.body.removeChild(this.block);
                clearInterval(this.timer);
            }
        }
}