import Phaser from 'phaser';
import { saveConfiguration } from '../common';

export default class extends Phaser.State {

    create() {
        this.stage.backgroundColor = '#000000';

        this.title = this.add.sprite(this.world.centerx, 50, 'sounddodgeTitle');
        // this.title.anchor.setTo(0.5, 0.5);

        this.playButton = this.add.button(this.camera.view.centerX, this.camera.view.centerY - 120, 'playButton', this.startSelection, this);
        this.playButton.input.useHandCursor = true;
        this.playButton.anchor.setTo(0.5, 0.5);

        this.optionsButton = this.add.button(this.camera.view.centerX, this.camera.view.centerY, 'optionsButton', this.optionsSelection, this);
        this.optionsButton.input.useHandCursor = true;
        this.optionsButton.anchor.setTo(0.5, 0.5);

        this.quitButton = this.add.button(this.camera.view.centerX, this.camera.view.centerY + 120, 'quitButton', this.quitSelection, this);
        this.quitButton.input.useHandCursor = true;
        this.quitButton.anchor.setTo(0.5, 0.5);

        this.backgroundMusic = this.add.audio('backgroundMusic');
        this.backgroundMusic.volume = 0.2 * this.game.global.configuration.volume;
        this.backgroundMusic.play();

        this.game.global.howl.soundOne.volume(0);
        this.game.global.howl.soundOne.play();

        saveConfiguration();
    }

    startSelection() {
        this.game.global.howl.soundOne.stop();
        this.game.global.howl.soundOne.volume(1 * this.game.global.configuration.volume);
        this.backgroundMusic.stop();
        // TODO Clear needed???
        this.state.clearCurrentState();
        this.state.start('selection');
    }

    optionsSelection() {
        this.game.global.howl.soundOne.stop();
        this.backgroundMusic.stop();
        // TODO Clear needed???
        this.state.clearCurrentState();
        this.state.start('options');
    }

    quitSelection() {
        this.game.global.howl.soundOne.stop();
        this.backgroundMusic.stop();
        // TODO Clear needed???
        this.state.clearCurrentState();
        this.destroy();
    }

}
