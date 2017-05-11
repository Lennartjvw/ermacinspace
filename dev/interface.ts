/**
 * InterFace
 */
class InterFace {

    private icon:HTMLElement;
    public heatlhBarWrapper:HTMLElement;
    public healthBar:HTMLElement;

    public timer:TimerScore;

    constructor() {

        this.icon = document.createElement("icon");
        this.icon.setAttribute ("id", "icon");
        document.body.appendChild(this.icon);
        
        this.heatlhBarWrapper = document.createElement("healthBarWrapper");
        this.heatlhBarWrapper.setAttribute ("id", "hbw");
        //this.heatlhBarWrapper.innerHTML = health + "/100";
        document.body.appendChild(this.heatlhBarWrapper);

        this.healthBar = document.createElement("healthbar");
        this.healthBar.setAttribute ("id", "hb");
        this.heatlhBarWrapper.appendChild(this.healthBar);
        this.healthBar.style.width = "400px";
        this.healthBar.style.border = "none";


    }

    public getDamage75() {
        this.healthBar.style.width = "300px";
    }

    public getDamage50() {
        this.healthBar.style.width = "200px";
    }

    public getDamage25() {
        this.healthBar.style.width = "100px";
    }

    public getDamage0() {
        this.healthBar.style.width = "0px";
    }
}