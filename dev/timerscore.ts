/**
 * timerScore
 */
class TimerScore {

    public timer:number = 0;
    public counter:number = 0;
    public showScore:HTMLElement;
    private middleScore:HTMLElement;
    private background:HTMLElement;

    constructor() {
        
        this.background = document.createElement('bg');
        this.background.setAttribute("id", "bg-score");
        document.body.appendChild(this.background);


        this.timer = setInterval(this.timerScore.bind(this), 1000);
        this.showScore = document.createElement("show");
        this.showScore.setAttribute("id", "showscore");
        document.body.appendChild(this.showScore);

    }

    public timerScore(){

        this.counter++;
        console.log(this.counter)
        this.showScore.innerHTML = "Your time is " + "</ br>" + "" + this.counter;

    }

    public minusScore(){
        this.counter += 25;
    }

    public stopTimer() {
        console.log("gestopt!!");
        clearInterval(this.timer); 
        this.showScore.remove(); 
    }

    public addScore() {

        this.middleScore = document.createElement("middleScore");
        this.middleScore.setAttribute("id", "middlescore");
        this.middleScore.innerHTML = "You died! " + "</br>" + "Your time is: " + this.counter;
        document.body.appendChild(this.middleScore);
        console.log("Your died! " + this.counter);
    }

        public addScoreTwo() {

        this.middleScore = document.createElement("middleScore");
        this.middleScore.setAttribute("id", "middlescore");
        this.middleScore.innerHTML = "Good job!" + "</br>" + "Your time is: " + this.counter;
        document.body.appendChild(this.middleScore);
        console.log("Good job! " + this.counter);
    }
}