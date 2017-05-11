var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var BeginScreen = (function () {
    function BeginScreen() {
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
    BeginScreen.prototype.startGame = function () {
        this.startButton.remove();
        this.title.remove();
        this.nameTextField.remove();
        this.playerValue = this.nameTextField.value;
        console.log(this.playerValue);
        new StoryTell();
    };
    return BeginScreen;
}());
var Bullet = (function () {
    function Bullet(x, y, lastKey) {
        this.bulletDirection = 1;
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
    Bullet.prototype.gameLoop = function () {
        this.bulletMove();
        requestAnimationFrame(this.gameLoop.bind(this));
    };
    Bullet.prototype.bulletMove = function () {
        if (this.lastKey == 0) {
            this.bulletSpeed = 20;
            this.bulletDirection = 1;
        }
        if (this.lastKey == 1) {
            this.bulletDirection = -1;
            this.bulletSpeed = -20;
        }
        this.x += this.bulletSpeed;
        this.bullet.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(" + this.bulletDirection + ")";
        if (this.x > window.innerWidth || this.x > this.startPositionX + 500 || this.x < 0 || this.x < this.startPositionX - 500) {
            this.bullet.remove();
        }
    };
    return Bullet;
}());
var Character = (function () {
    function Character(s, left, right, up, down, spacebar) {
        this.lastKey = 0;
        this.bulletArray = [];
        this.leftSpeed = 0;
        this.rightSpeed = 0;
        this.downSpeed = 0;
        this.upSpeed = 0;
        this.counter = 0;
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
    Character.prototype.onKeyDown = function (event) {
        switch (event.keyCode) {
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
    };
    Character.prototype.addBullet = function () {
        var b = new Bullet(this.x, this.y, this.lastKey);
        this.start.addBullet(b);
    };
    Character.prototype.onKeyUp = function (event) {
        switch (event.keyCode) {
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
    };
    Character.prototype.move = function () {
        this.x = this.x - this.leftSpeed + this.rightSpeed;
        this.y = this.y - this.upSpeed + this.downSpeed;
        if (this.x + 40 > window.innerWidth || this.x < 0) {
            this.x *= -1;
        }
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.y *= -1;
        }
        if (this.lastKey == 0) {
            this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
        }
        else if (this.lastKey == 1) {
            this.player.style.transform = "translate(" + this.x + "px, " + this.y + "px) scaleX(-1)";
        }
    };
    Character.prototype.removeInstance = function () {
        document.body.removeChild(this.player);
    };
    Character.prototype.removeChar = function () {
        this.player.remove();
    };
    Character.prototype.flick = function () {
        this.timer = setInterval(this.flicker.bind(this), 250);
    };
    Character.prototype.flicker = function () {
        this.counter++;
        console.log("player " + this.counter);
        if (this.counter == 1) {
            this.player.remove();
        }
        if (this.counter == 2) {
            document.body.appendChild(this.player);
        }
        if (this.counter == 3) {
            this.player.remove();
        }
        if (this.counter == 4) {
            document.body.appendChild(this.player);
            clearInterval(this.timer);
        }
    };
    return Character;
}());
var Enemy = (function () {
    function Enemy(g, skin) {
        this.game = g;
        this.enemyDiv = document.createElement(skin);
        document.body.appendChild(this.enemyDiv);
        this.x = 1400;
        this.y = (Math.random() * (window.innerHeight / 2)) + (window.innerHeight / 4);
        this.speedX = Math.ceil(Math.random() * 50);
        this.speedY = Math.ceil(Math.random() * 50);
        this.width = 50;
        this.height = 50;
        this.move();
        this.draw();
    }
    Enemy.prototype.move = function () {
    };
    Enemy.prototype.hitEnemy = function () {
        console.log("the div is removed!");
        this.enemyDiv.remove();
    };
    Enemy.prototype.draw = function () {
        this.x += this.speedX;
        this.y += this.speedY;
        console.log("MOVE!");
        if (this.x + 40 > window.innerWidth || this.x < 0) {
            this.speedX *= -1;
        }
        if (this.y + 40 > window.innerHeight || this.y < 0) {
            this.speedY *= -1;
        }
        this.enemyDiv.style.transform = "translate(" + this.x + "px, " + this.y + "px)";
    };
    return Enemy;
}());
var InterFace = (function () {
    function InterFace() {
        this.icon = document.createElement("icon");
        this.icon.setAttribute("id", "icon");
        document.body.appendChild(this.icon);
        this.heatlhBarWrapper = document.createElement("healthBarWrapper");
        this.heatlhBarWrapper.setAttribute("id", "hbw");
        document.body.appendChild(this.heatlhBarWrapper);
        this.healthBar = document.createElement("healthbar");
        this.healthBar.setAttribute("id", "hb");
        this.heatlhBarWrapper.appendChild(this.healthBar);
        this.healthBar.style.width = "400px";
        this.healthBar.style.border = "none";
    }
    InterFace.prototype.getDamage75 = function () {
        this.healthBar.style.width = "300px";
    };
    InterFace.prototype.getDamage50 = function () {
        this.healthBar.style.width = "200px";
    };
    InterFace.prototype.getDamage25 = function () {
        this.healthBar.style.width = "100px";
    };
    InterFace.prototype.getDamage0 = function () {
        this.healthBar.style.width = "0px";
    };
    return InterFace;
}());
var StartGame = (function () {
    function StartGame() {
        this.count = 0;
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
    StartGame.prototype.counter = function () {
        this.count++;
        console.log(this.count);
        if (this.count == 2) {
            this.block.style.width = "100px";
            this.block.style.height = "100px";
        }
        if (this.count == 4) {
            this.block.style.width = "200px";
            this.block.style.height = "200px";
        }
        if (this.count == 6) {
            this.block.style.width = "400px";
            this.block.style.height = "400px";
            this.block.style.backgroundColor = "green";
        }
    };
    StartGame.prototype.score = function () {
        if (this.count > 6) {
            document.body.removeChild(this.block);
            clearInterval(this.timer);
        }
    };
    return StartGame;
}());
window.addEventListener("load", function () {
    new BeginScreen();
});
var Score = (function () {
    function Score() {
        this.timer = 0;
        this.wrapper = document.createElement("wrapper");
        this.wrapper.setAttribute("id", "scorewrapper");
        document.body.appendChild(this.wrapper);
    }
    return Score;
}());
var TimerScore = (function () {
    function TimerScore() {
        this.timer = 0;
        this.counter = 0;
        this.background = document.createElement('bg');
        this.background.setAttribute("id", "bg-score");
        document.body.appendChild(this.background);
        this.timer = setInterval(this.timerScore.bind(this), 1000);
        this.showScore = document.createElement("show");
        this.showScore.setAttribute("id", "showscore");
        document.body.appendChild(this.showScore);
    }
    TimerScore.prototype.timerScore = function () {
        this.counter++;
        console.log(this.counter);
        this.showScore.innerHTML = "Your time is " + "</ br>" + "" + this.counter;
    };
    TimerScore.prototype.minusScore = function () {
        this.counter += 25;
    };
    TimerScore.prototype.stopTimer = function () {
        console.log("gestopt!!");
        clearInterval(this.timer);
        this.showScore.remove();
    };
    TimerScore.prototype.addScore = function () {
        this.middleScore = document.createElement("middleScore");
        this.middleScore.setAttribute("id", "middlescore");
        this.middleScore.innerHTML = "You died! " + "</br>" + "Your time is: " + this.counter;
        document.body.appendChild(this.middleScore);
        console.log("Your died! " + this.counter);
    };
    TimerScore.prototype.addScoreTwo = function () {
        this.middleScore = document.createElement("middleScore");
        this.middleScore.setAttribute("id", "middlescore");
        this.middleScore.innerHTML = "Good job!" + "</br>" + "Your time is: " + this.counter;
        document.body.appendChild(this.middleScore);
        console.log("Good job! " + this.counter);
    };
    return TimerScore;
}());
var Start = (function () {
    function Start() {
        this.bullets = new Array();
        this.enemy1 = new Array();
        this.count = 0;
        this.dmgcount = 0;
        console.log("doorheen");
        this.sound = new Howl({
            urls: ['sounds/Platformer2.mp3']
        }).play();
        this.sound.play();
        this.timer = new TimerScore();
        this.interface = new InterFace();
        this.char1 = new Character(this, 65, 68, 87, 83, 32);
        requestAnimationFrame(this.gameLoop.bind(this));
        for (var i = 0; i < 15; i++) {
            this.enemy1.push(new Green(this));
        }
        this.utils = new Utils();
        this.utilsbullet = new UtilsBullet();
    }
    Start.prototype.addBullet = function (b) {
        this.bullets.push(b);
    };
    Start.prototype.gameLoop = function () {
        for (var i = 0; i < this.enemy1.length; i++) {
            this.enemy1[i].draw();
        }
        this.char1.move();
        requestAnimationFrame(this.gameLoop.bind(this));
        this.updateElements();
    };
    Start.prototype.updateElements = function () {
        for (var _i = 0, _a = this.enemy1; _i < _a.length; _i++) {
            var en = _a[_i];
            if (this.utils.hasOverlap(en, this.char1)) {
                en.hitEnemy();
                this.dmgcount++;
                if (this.dmgcount == 1) {
                    this.interface.getDamage75();
                    this.timer.minusScore();
                }
                if (this.dmgcount == 2) {
                    this.interface.getDamage50();
                    this.timer.minusScore();
                }
                if (this.dmgcount == 3) {
                    this.interface.getDamage25();
                    this.timer.minusScore();
                }
                if (this.dmgcount == 4) {
                    this.interface.getDamage0();
                    this.timer.minusScore();
                    this.timer.stopTimer();
                    this.timer.addScore();
                    this.char1.removeChar();
                }
                this.removeFromArray(en);
                console.log("enemy hits character");
            }
            for (var _b = 0, _c = this.bullets; _b < _c.length; _b++) {
                var bu = _c[_b];
                if (this.utilsbullet.hasOverlapTwo(en, bu)) {
                    en.hitEnemy();
                    this.removeFromArray(en);
                    console.log("BULLET HITS ENEMY");
                }
            }
        }
    };
    Start.prototype.removeFromArray = function (b) {
        console.log("but now remove " + b + " from array");
        for (var i = 0; i < this.enemy1.length; i++) {
            if (this.enemy1[i] == b) {
                console.log("enemy gevonden");
                this.enemy1.splice(i, 1);
                this.count++;
                if (this.count == 15) {
                    console.log("red added");
                    for (var x = 0; x < 20; x++) {
                        this.enemy1.push(new Red(this));
                    }
                }
                if (this.count == 35) {
                    for (var x = 0; x < 30; x++) {
                        this.enemy1.push(new Green(this));
                        console.log("20 gehaald");
                    }
                }
                if (this.count == 65) {
                    for (var x = 0; x < 40; x++) {
                        this.enemy1.push(new Red(this));
                        console.log("30 gehaald");
                    }
                }
                if (this.count == 105) {
                    for (var x = 0; x < 50; x++) {
                        this.enemy1.push(new Green(this));
                        console.log("40 gehaald");
                    }
                }
                if (this.count == 155) {
                    this.timer.stopTimer();
                    this.char1.removeInstance();
                    this.timer.addScoreTwo();
                }
                console.log(this.count);
            }
        }
    };
    return Start;
}());
var StoryTell = (function () {
    function StoryTell() {
        this.sound = new Howl({
            urls: ['sounds/ermac.wav']
        }).play();
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
    StoryTell.prototype.startGame = function () {
        this.charSkin.remove();
        this.text.remove();
        new Start();
        this.sound.stop();
    };
    return StoryTell;
}());
var Utils = (function () {
    function Utils() {
    }
    Utils.prototype.hasOverlap = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return Utils;
}());
var UtilsBullet = (function () {
    function UtilsBullet() {
    }
    UtilsBullet.prototype.hasOverlapTwo = function (c1, c2) {
        return !(c2.x > c1.x + c1.width || c2.x + c2.width < c1.x || c2.y > c1.y + c1.height || c2.y + c2.height < c1.y);
    };
    return UtilsBullet;
}());
var Green = (function (_super) {
    __extends(Green, _super);
    function Green(g) {
        _super.call(this, g, "green");
    }
    return Green;
}(Enemy));
var Red = (function (_super) {
    __extends(Red, _super);
    function Red(g) {
        _super.call(this, g, "red");
    }
    return Red;
}(Enemy));
//# sourceMappingURL=main.js.map