import Phaser from 'phaser';
import { activateSwipeFunctionality, checkIfLevelCompleted } from '../common';
import { game } from '../main';

export default class extends Phaser.State {

    constructor() {
        super();
        this.totalSelectionScreens = 3;
    }

    create() {
        this.stage.backgroundColor = '#000000';

        this.world.setBounds(0, 0, (this.game.global.camera.width * this.totalSelectionScreens), this.game.global.camera.height);

        // Easy
        this.selEasy = this.add.sprite((this.game.global.camera.width / 2), 50, 'selectionEasy');
        this.selEasy.anchor.setTo(0.5, 0.5);
        this.createLevelButtons('EASY');
        this.createCurrentSelectionRow('EASY');
        this.createBackButton('EASY');

        // Normal
        this.selNormal = this.add.sprite((this.game.global.camera.width / 2) + this.game.global.camera.width, 50, 'selectionNormal');
        this.selNormal.anchor.setTo(0.5, 0.5);
        this.createLevelButtons('NORMAL');
        this.createCurrentSelectionRow('NORMAL');
        this.createBackButton('NORMAL');

        // Hard
        this.selHard = this.add.sprite((this.game.global.camera.width / 2) + (this.game.global.camera.width * 2), 50, 'selectionHard');
        this.selHard.anchor.setTo(0.5, 0.5);
        this.createLevelButtons('HARD');
        this.createCurrentSelectionRow('HARD');
        this.createBackButton('HARD');

        // Swipe
        activateSwipeFunctionality.bind(this)(this.swipeSelectionScreen, this.swipeSelectionScreen, null, null);

        // Go to the last selected difficulty
        if (!this.game.global.lastSelectedDifficulty) {
            this.game.global.lastSelectedDifficulty = this.game.global.difficulty.NORMAL;
        }
        this.placeCameraAtDifficulty(this.game.global.lastSelectedDifficulty);
    }

    createCurrentSelectionRow(difficulty) {
        var spaceBetween = 50;
        var spaceAboveFloor = 80;
        var startPos = (this.game.global.camera.width / 2) - ((this.totalSelectionScreens * spaceBetween) / 2) + (spaceBetween / 2) +
            (this.game.global.camera.width * this.game.global.difficulty[difficulty].page);

        for (var i = 0; i < this.totalSelectionScreens; i++) {
            if (this.game.global.difficulty[difficulty].page === i) {
                var selEasyCurrent = this.add.sprite(startPos + (spaceBetween * i), (this.game.global.camera.height - spaceAboveFloor), 'currentSelection');
                selEasyCurrent.scale.setTo(1.3, 1.3);
                selEasyCurrent.anchor.setTo(0.5, 0.5);
            } else {
                var selEasyNotCurrent = this.add.sprite(startPos + (spaceBetween * i), (this.game.global.camera.height - spaceAboveFloor), 'notCurrentSelection');
                selEasyNotCurrent.anchor.setTo(0.5, 0.5);
            }
        }
    }

    createLevelButtons(difficulty) {
        var spaceBetween = 80;
        var spaceMarginSides = 30;
        var spaceBetweenTop = 150;
        var startPosX = spaceMarginSides + (spaceBetween / 2);
        var startPosY = spaceBetweenTop + (spaceBetween / 2);
        var posX = startPosX;
        var posY = startPosY;

        for (var i = 1; i <= this.game.global.totalNumberOfLevels; i++) {
            this.createLevelButton(i, difficulty, posX, posY);
            posX += spaceBetween;
            if ((this.game.global.camera.width - spaceMarginSides - (spaceBetween / 2)) <= posX) {
                posX = startPosX;
                posY += spaceBetween;
            }
        }
    }

    createLevelButton(lvlNbr, difficulty, x, y) {
        var butSprite = this.make.sprite(0, 0, 'number' + lvlNbr);
        var bmd = this.add.bitmapData(butSprite.width, butSprite.height);
        bmd.load(butSprite);

        if (checkIfLevelCompleted(lvlNbr, difficulty)) {
            this.shiftColorsFromRedToGreen(bmd, butSprite);
        }

        // add this. to the lvlButton at the end!
        var lvlButton = this.add.button((this.game.global.camera.width * this.game.global.difficulty[difficulty].page) + x, y, bmd, this.startLevel, this.lvlButton);
        lvlButton.input.useHandCursor = true;
        lvlButton.anchor.setTo(0.5, 0.5);
        lvlButton.levelNumber = lvlNbr;
        lvlButton.difficulty = difficulty;
    }

    shiftColorsFromRedToGreen(bmd, butSprite) {
        for (var i = 0; i < butSprite.width; i++) {
            for (var j = 0; j < butSprite.height; j++) {
                var color = bmd.getPixel(i, j);
                if (color.r === 0 && color.g === 0 && color.b === 0) {
                    // black don't do anything
                } else {
                    bmd.setPixel(i, j, color.g, color.r, color.b, 255, false);
                }
            }
        }

    }

    createBackButton(difficulty) {
        // Back button
        var backButton = this.add.button((this.game.global.camera.width * this.game.global.difficulty[difficulty].page) + 20, 20, 'backButton', this.returnToMenu, this);
        backButton.input.useHandCursor = true;
        backButton.scale.setTo(0.4, 0.4);
    }

    swipeSelectionScreen(direction, distance) {
        if (this.checkSwipePossible(direction)) {
            if (direction === 'left') {
                this.game.camera.view.x += this.game.global.camera.width;
            } else if (direction === 'right') {
                this.game.camera.view.x -= this.game.global.camera.width;
            }
        }
        // Set last selected selection
        this.game.global.lastSelectedDifficulty = this.difficultyBasedOnCamera();
    }

    checkSwipePossible(direction) {
        var cam = this.camera.view.x;
        if (direction === 'left') {
            if (cam < (this.game.global.camera.width * (this.totalSelectionScreens - 1) - 1)) {
                return true;
            }
            return false;
        } else if (direction === 'right') {
            if (cam > 0) {
                return true;
            }
            return false;
        }
    }

    placeCameraAtDifficulty(difficultyObj) {
        this.camera.view.x = this.game.global.camera.width * difficultyObj.page;
    }

    difficultyBasedOnCamera() {
        var diffs = Object.keys(this.game.global.difficulty);
        for (var dif of diffs) {
            if (this.camera.view.x === (this.game.global.camera.width * this.game.global.difficulty[dif].page)) {
                return this.game.global.difficulty[dif];
            }
        }
        console.log("Couldn't find the difficulty based on camera postion, returning default EASY difficulty.");
        return this.game.global.difficulty.EASY;
    }

    returnToMenu() {
        this.state.clearCurrentState();
        this.state.start('menu');
    }

    startLevel() {
        game.state.clearCurrentState();
        game.state.start('level', true, false, this.levelNumber, this.difficulty);
    }

}
