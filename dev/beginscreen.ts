/**
 * BeginScreen
 */

/// <reference path="definitions/jquery.d.ts" />
/// <reference path="howler.d.ts"/>

class BeginScreen {

    private title:HTMLElement;
    private nameTextField:HTMLInputElement;
    public playerValue: string;
    private startButton:HTMLElement;
    public charSkin:StoryTell;

    constructor() {

        this.title = document.createElement("title");
        this.title.innerHTML = "Ermac in Space";
        this.title.setAttribute("id", "title");
        document.body.appendChild(this.title);

        this.nameTextField = document.createElement("input");
        this.nameTextField.setAttribute("class", "textfield");
        this.nameTextField.setAttribute("id", "playerInput");
        this.nameTextField.setAttribute("type", "text");
        this.nameTextField.setAttribute("value", "");
        this.nameTextField.setAttribute("placeholder", "Your name");
        document.body.appendChild(this.nameTextField);
        
        this.startButton = document.createElement("startbutton");
        this.startButton.setAttribute("id", "startbutton");
        this.startButton.innerHTML = "Start Game";
        document.body.appendChild(this.startButton);
        
        this.startButton.addEventListener("click", this.startGame.bind(this));
    }

    private startGame() {
        this.startButton.remove();
        this.title.remove();
        this.nameTextField.remove();
        this.playerValue = this.nameTextField.value;       
        console.log(this.playerValue);
        new StoryTell();
        
    }
}