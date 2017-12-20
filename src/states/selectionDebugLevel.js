import Phaser from 'phaser';
import { activateSwipeFunctionality } from '../common';

export default class extends Phaser.State {

    create() {
        this.stage.backgroundColor = '#000000';

        this.createLevelButtons();

        // Back button
        var backButton = this.add.button(20, 20, 'backButton', this.returnToOptions, this);
        backButton.input.useHandCursor = true;
        backButton.scale.setTo(0.4, 0.4);

        activateSwipeFunctionality.bind(this)(null, null, this.swipeTest, this.swipeTest);
    }

    createLevelButtons() {
        var spaceBetween = 80;
        var spaceMarginSides = 30;
        var spaceBetweenTop = 150;
        var startPosX = spaceMarginSides + (spaceBetween / 2);
        var startPosY = spaceBetweenTop + (spaceBetween / 2);
        var posX = startPosX;
        var posY = startPosY;

        for (var i = 1; i <= this.game.global.totalNumberOfLevels; i++) {
            console.log('button ' + i);
            this.createLevelButton(i, posX, posY);
            posX += spaceBetween;
            if ((this.game.global.camera.width - spaceMarginSides - (spaceBetween / 2)) <= posX) {
                posX = startPosX;
                posY += spaceBetween;
            }
        }
    }

    createLevelButton(lvlNbr, x, y) {
        // Add this to lvlButton
        var lvlButton = this.add.button(x, y, 'number' + lvlNbr, this.startLevel, this);
        lvlButton.input.useHandCursor = true;
        lvlButton.anchor.setTo(0.5, 0.5);
        lvlButton.levelNumber = lvlNbr;
        lvlButton.difficulty = 'EASY';
    }

    swipeSelectionScreen(direction) {
        if (this.checkSwipePossible(direction)) {
            if (direction === 'left') {
                this.camera.view.x += this.game.global.camera.width;
            } else if (direction === 'right') {
                this.camera.view.x -= this.game.global.camera.width;
            }
        }
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

    startLevel() {
        this.state.clearCurrentState();
        this.state.start('debugLevel', true, false, this.levelNumber, this.difficulty);
    }

    returnToOptions() {
        this.state.clearCurrentState();
        this.state.start('options');
    }

    swipeTest(direction, distance) {
        console.log('you swipe bro! ' + distance + ' - ' + direction);
    }

}
