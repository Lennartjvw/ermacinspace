/**
 * Score
 */
class Score {

    public wrapper:HTMLElement;
    public timer = 0;

    constructor() {
        
        this.wrapper = document.createElement("wrapper");
        this.wrapper.setAttribute("id", "scorewrapper");
        document.body.appendChild(this.wrapper);

    }
}