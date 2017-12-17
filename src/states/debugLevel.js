import Phaser from 'phaser';
import { buildLevel, activateSwipeFunctionality } from '../common';

export default class extends Phaser.State {

    init(lvlNbr, difficulty) {
        this.levelNumber = lvlNbr;
        this.levelSpeed = this.global.difficulty[difficulty].speed;
        this.levelDifficulty = difficulty;
        console.log('Launch level : ' + lvlNbr + ', difficulty : ' + difficulty + ', speed : ' + this.levelSpeed + '.');
    }

    create() {
        this.mapLoaded = false;

        buildLevel('assets\\levels\\level' + this.levelNumber + '.json', this);

        // Back button
        var backButton = this.add.button(20, 20, 'backButton', this.returnToMenu, this);
        backButton.input.useHandCursor = true;
        backButton.scale.setTo(0.4, 0.4);

        // Swipe
        activateSwipeFunctionality(this.swipeLevel, this.swipeLevel, this.swipeLevel, this.swipeLevel, this);

        this.paused = false;
    }

    update() {
        if (this.mapLoaded) {
            // Maps loaded
            // Clear player input events
            this.player.events.destroy();
        } else {
            console.log('Map nod loaded yet');
        }
    }

    render() {
        //	render phase
    }

    startLevelClick() {
        console.log('start level');
        this.player.events.onInputDown.remove(this.startLevelClick, this);
    }

    playerClickedOn() {
        console.log('mouse down on player');
    }

    playerClickedOff() {
        console.log('mouse up on player');
    }

    swipeLevel(direction, distance, newThis) {
        if (newThis.checkSwipePossible(direction)) {
            if (direction === 'down') {
                this.camera.view.y -= distance;
            } else if (direction === 'up') {
                this.camera.view.y += distance;
            }
        }
    }

    checkSwipePossible(direction) {
        var camY = this.camera.view.y;
        if (direction === 'up') {
            if (camY < this.world.bounds.height) {
                return true;
            }
            return false;
        } else if (direction === 'down') {
            if (camY > 0) {
                return true;
            }
            return false;
        }
        // can't go left or right
        return false;
    }

    returnToMenu() {
        this.global.howl.soundOne.stop();
        this.state.start('selectionDebugLevel');
    }

}
