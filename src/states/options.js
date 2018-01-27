import Phaser from 'phaser';
import { roundNumber } from '../common';

export default class extends Phaser.State {

    create() {
        this.optionsTitle = this.add.sprite((this.game.global.camera.width / 2), 50, 'optionsButton');
        this.optionsTitle.anchor.setTo(0.5, 0.5);

        // Volume
        var textVolume = 'Volume';
        this.volumeText = this.add.text(50, 130, textVolume, this.game.styles.default);
        this.volumeText.enableBody = true;

        this.volumeBar = this.add.sprite(50, 190, 'volumeBar');
        this.volumeButton = this.add.sprite(100, 194, 'volumeButton');
        this.volumeButton.inputEnabled = true;
        this.volumeButton.input.enableDrag(false, false, false, 255, null, this.volumeBar);
        this.volumeButton.input.allowVerticalDrag = false;
        var textVolumeNumber = '' + (this.game.global.configuration.volume * 100) + '%';
        this.volumeNumberText = this.add.text(300, 130, textVolumeNumber, this.game.styles.default);
        this.volumeButton.x = this.positionForVolume();

        // Debug button
        var textDebug = this.game.global.debug ? 'Debug on' : 'Debug off';
        var debugText = this.add.text(50, 280, textDebug, this.game.styles.default);
        debugText.inputEnabled = true;
        debugText.events.onInputUp.add(this.debugToggle, debugText);

        // Debug lebel button
        var textDebugLevel = 'Debug level';
        var debugLevelText = this.add.text(50, 350, textDebugLevel, this.game.styles.default);
        debugLevelText.inputEnabled = true;
        debugLevelText.events.onInputUp.add(this.startDebugLevel, this);

        // Debug lebel button
        var textReset = 'Reset';
        var resetText = this.add.text(50, 420, textReset, this.game.styles.default);
        resetText.inputEnabled = true;
        resetText.events.onInputUp.add(this.resetGameProgress, this);

        // Back button
        var backButton = this.add.button(this.game.global.camera.width - 100, this.game.global.camera.height - 120, 'backButton', this.returnToMenu, this);
        backButton.input.useHandCursor = true;
        backButton.anchor.setTo(0.5, 0.5);
    }

    update() {
        var newVolume = roundNumber(this.calculateVolume(), 2);
        this.volumeNumberText.setText(Math.round(newVolume * 100));
        this.game.global.configuration.volume = newVolume;
    }

    resetGameProgress() {
        console.log('Reset your game progress');
        this.game.global.configuration.completedLevels = { EASY: [], NORMAL: [], HARD: [] };
    }

    debugToggle(debugText) {
        this.game.global.debug = !this.game.global.debug;
        debugText.text = this.game.global.debug ? 'Debug on' : 'Debug off';
    }

    returnToMenu() {
        this.state.clearCurrentState();
        this.state.start('menu');
    }

    startDebugLevel() {
        this.state.clearCurrentState();
        this.state.start('selectionDebugLevel');
    }

    calculateVolume() {
        var minX = this.volumeBar.x;
        var maxX = this.volumeBar.x + this.volumeBar.width - this.volumeButton.width - minX;

        var current = this.volumeButton.x - minX;
        var volume = (1 / maxX) * current;

        return volume;
    }

    positionForVolume() {
        var minX = this.volumeBar.x;
        var maxX = this.volumeBar.x + this.volumeBar.width - this.volumeButton.width - minX;

        return ((this.game.global.configuration.volume * 100) * (maxX / 100)) + minX;
    }

}
