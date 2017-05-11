/**
 * StoryTell
 */

/// <reference path="definitions/jquery.d.ts" />
/// <reference path="howler.d.ts"/>


class StoryTell {

    private charSkin:HTMLElement;
    private text:HTMLElement;
    private ready:HTMLElement;
    public sound

    constructor() {

                this.sound = new Howl({
  urls: ['sounds/ermac.wav']
}).play();

// sound.play();
        
        this.charSkin = document.createElement("charskin");
        this.charSkin.setAttribute("id", "charskin");
        document.body.appendChild(this.charSkin);

        this.text = document.createElement("text");
        this.text.setAttribute("id", "text");
        this.text.innerHTML = "Hello, my name is Ermac we have to fight in space!" +
                              "My spaceship is able to shoot bullets to kill enemies." +
                              "You have to move my spaceship with W, A, S, D, and you " +
                              "shoot bullets with the spacebar. And last but not least:" +
                              "Try not to get hit by the enemies! Hit ready to start!";
        document.body.appendChild(this.text);

        this.ready = document.createElement("ready");
        this.ready.setAttribute("id", "ready");
        this.ready.innerHTML = "Ready";
        this.text.appendChild(this.ready);
        this.ready.addEventListener("click", this.startGame.bind(this));

    

    }

    private startGame() {
        this.charSkin.remove();
        this.text.remove();
        new Start();
        this.sound.stop();
        
        
    }
}

