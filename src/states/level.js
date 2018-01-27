import Phaser from 'phaser';
import { buildLevel, checkIfLevelCompleted } from '../common';
import Constants from '../constants';

export default class extends Phaser.State {

    init(lvlNbr, difficulty) {
        this.levelNumber = lvlNbr;
        this.levelSpeed = this.game.global.difficulty[difficulty].speed;
        this.levelDifficulty = difficulty;
        console.log('Launch level : ' + lvlNbr + ', difficulty : ' + difficulty + ', speed : ' + this.levelSpeed + '.');
    }

    create() {
        this.mapLoaded = false;
        this.startLevel = false;

        buildLevel('assets\\levels\\level' + this.levelNumber + '.json', this);

        var textStartLevel = 'Click Me!\nTo start.';
        this.startLevelText = this.add.text(this.camera.view.centerX, 150, textStartLevel, this.game.styles.default);
        this.startLevelText.anchor.setTo(0.5, 0.5);

        // particles player
        this.playerEmitter = this.add.emitter(0, 0, 30);
        this.playerEmitter.makeParticles('pixelParticle');
        this.playerEmitter.setYSpeed(-50, 50);
        this.playerEmitter.setXSpeed(-50, 50);
        this.playerEmitter.gravity = -100;
        this.playerEmitter.width = 40;

        this.paused = false;
    }

    update() {
        if (this.mapLoaded) {
            this.playerEmitter.x = this.player.x;
            this.playerEmitter.y = this.player.y;
            if (!this.playerEmitter.on) {
                this.playerEmitter.start(false, 1000, 20, 10);
                this.playerEmitter.z = 100;
            }
        }
        if (this.mapLoaded && this.startLevel) {
            var endOverlap = false;
            endOverlap = this.physics.arcade.overlap(this.player, this.sourceBoxes, this.lostCondition, null, this);
            if (!endOverlap) {
                endOverlap = this.physics.arcade.overlap(this.player, this.endBar, this.winCondition, null, this);
            }

            var overlap = this.physics.arcade.overlap(this.player, this.areaBoxes, this.soundOverlap, null, this);

            if (!overlap) {
                this.game.global.howl.soundOne.stop();
                // console.log("No overlap");
                this.soundId = null;
            }

            if (!endOverlap || !this.paused) {
                if (this.playerfollow) {
                    this.player.x = this.input.x + this.camera.x;
                    this.player.y = this.input.y + this.camera.y;
                } else if (this.player.y - 20 < this.camera.y + 5) {
                    // player no longer in camera move inside camera
                    // console.log("OUT OF CAMERA, MOVE!!");
                    this.player.y = this.camera.y + 5 + 20;
                }

                this.camera.y += this.levelSpeed;
            }
        } else {
            console.log('Map nod loaded yet');
        }
    }

    render() {
        // render phase
        // this.debug.spriteInfo(this.player, 10, 10);
    }

    startLevelClick() {
        console.log('start level');
        this.player.events.onInputDown.remove(this.startLevelClick, this);
        this.startLevelText.destroy();
        this.startLevel = true;
    }

    playerClickedOn() {
        console.log('mouse down on player');
        this.playerfollow = true;
    }

    playerClickedOff() {
        console.log('mouse up on player');
        this.playerfollow = false;
    }

    soundOverlap(icon, box) {
        // console.log("overlap " + icon.name + " - " + box.name);
        // console.log("overlap sound id : " + this.soundId);
        if (!this.soundId) {
            console.log('start music');
            this.soundId = this.game.global.howl.soundOne.play();
            console.log('music started ' + this.soundId);
        } else {
            if (!this.game.global.howl.soundOne.playing(this.soundId) && !this.paused) {
                console.log('start play ');
                this.game.global.howl.soundOne.play(this.soundId);
            }
        }

        if (!this.paused) {
            this.updateSoundBalance(box.soundSource, icon, this.game.global.howl.soundOne);
            this.updateSoundDistance(box.soundSource, icon, this.game.global.howl.soundOne, box);
        }
    }

    lostCondition(icon, source) {
        if (!this.paused) {
            this.playerEmitter.destroy();
            // var text = "Lost!! Got hit by " + source.name;
            var text = 'Lost!!';
            console.info('source HIT log');
            var t = this.add.text(this.camera.view.centerX, this.camera.view.centerY, text, this.game.styles.default);
            t.anchor.setTo(0.5, 0.5);
            this.time.events.add(1000, this.returnToSelection, this);
            this.game.global.howl.soundOne.stop();
            this.paused = true;

            window.plugins.playGamesServices.incrementAchievement({
                achievementId: Constants.ACH_KEEP_TRYING,
                numSteps: 1
            });
            window.plugins.playGamesServices.incrementAchievement({
                achievementId: Constants.ACH_DONT_GIVE_UP_HOPE,
                numSteps: 1
            });
        }
    }

    winCondition(icon, source) {
        if (!this.paused) {
            this.playerEmitter.destroy();
            var text = 'Won!!';
            var t = this.add.text(this.camera.view.centerX, this.camera.view.centerY, text, this.game.styles.winCondition);
            t.anchor.setTo(0.5, 0.5);
            this.time.events.add(1000, this.returnToSelection, this);
            this.paused = true;

            // Set in the global variables that this level was completed
            if (!checkIfLevelCompleted(this.levelNumber, this.levelDifficulty)) {
                this.game.global.configuration.completedLevels[this.levelDifficulty].push(this.levelNumber);
            }


            window.plugins.playGamesServices.incrementAchievement({
                achievementId: Constants.ACH_NICE_WORK,
                numSteps: 1
            });
            window.plugins.playGamesServices.incrementAchievement({
                achievementId: Constants.ACH_YOURE_THE_BEST,
                numSteps: 1
            });
        }
    }

    returnToSelection() {
        this.game.global.howl.soundOne.stop();
        this.state.start('selection');
    }

    returnToMenu() {
        this.game.global.howl.soundOne.stop();
        this.state.start('menu');
    }

    updateSoundBalance(source, target, sound) {
        var posx = ((source.x - target.x) / this.world.width) * 2;
        var posy = ((source.y - target.y) / this.world.height) * 2;
        // Change the sound position
        sound.pos(posx, posy, -0.5, this.soundId);
    }

    updateSoundDistance(source, target, sound, soundBox) {
        var distance = this.physics.arcade.distanceBetween(source, target);
        var soundMaxDistance = Math.sqrt(Math.pow(soundBox.height, 2) + Math.pow(soundBox.width, 2));
        var vol = (soundMaxDistance - distance) / soundMaxDistance;
        sound.volume(vol * this.game.global.configuration.volume, this.soundId);
    }

}
