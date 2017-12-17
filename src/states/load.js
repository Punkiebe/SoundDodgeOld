import Phaser from 'phaser';
import Howl from 'howler';
import { manageSavedConfiguration } from '../common';

export default class extends Phaser.State {

    preload() {
        var loadingText = this.add.sprite(this.world.centerx, this.world.centerY, 'loadingText');
        // loadingText.anchor.setTo(0.5, 0.5);
        // var progressBar = this.add.sprite(this.world.centerX, 300, 'loadingBar');
        // progressBar.anchor.setTo(0.5, 0.5);

        // this.load.setPreloadSprite(progressBar);

        this.load.image('sounddodgeTitle', 'assets/img/menu/text_sounddodge.png');
        this.load.image('neviesTitle', 'assets/img/menu/text_nevies.png');
        this.load.image('playButton', 'assets/img/menu/text_play.png');
        this.load.image('optionsButton', 'assets/img/menu/text_options.png');
        this.load.image('quitButton', 'assets/img/menu/text_quit.png');
        this.load.image('backButton', 'assets/img/menu/text_back.png');
        this.load.image('volumeBar', 'assets/img/menu/volumeBar.png');
        this.load.image('volumeButton', 'assets/img/menu/volumeButton.png');

        this.load.image('pixelArea', 'assets/img/game/onewhitepixel.png');
        this.load.image('pixelSource', 'assets/img/game/oneredpixel.png');
        // this.load.image('pixelParticle', 'assets/img/game/tworedpixels.png');
        this.load.image('pixelParticle', 'assets/img/game/pixel_diamond_red2.png');
        this.load.image('pixelPlayer', 'assets/img/game/player_clean.png');

        this.load.image('selectionEasy', 'assets/img/menu/selection_easy.png');
        this.load.image('selectionNormal', 'assets/img/menu/selection_normal.png');
        this.load.image('selectionHard', 'assets/img/menu/selection_hard.png');

        this.load.image('currentSelection', 'assets/img/menu/selection_indecator_current.png');
        this.load.image('notCurrentSelection', 'assets/img/menu/selection_indecator_notcurrent.png');

        this.load.image('number1', 'assets/img/menu/number_1.png');
        this.load.image('number2', 'assets/img/menu/number_2.png');
        this.load.image('number3', 'assets/img/menu/number_3.png');
        this.load.image('number4', 'assets/img/menu/number_4.png');
        this.load.image('number5', 'assets/img/menu/number_5.png');
        this.load.image('number6', 'assets/img/menu/number_6.png');
        this.load.image('number7', 'assets/img/menu/number_7.png');
        this.load.image('number8', 'assets/img/menu/number_8.png');
        this.load.image('number9', 'assets/img/menu/number_9.png');
        this.load.image('number10', 'assets/img/menu/number_10.png');
        this.load.image('number11', 'assets/img/menu/number_11.png');

        this.load.audio('backgroundMusic', ['assets/audio/menu/classical_piano_music_track_mary_.mp3']);

        this.global.howl.soundOne = new Howl({
            src: ['assets/audio/game/static_noise_from_tv_with_no_signal.mp3']
        });
        // Code To fix the load of libs used for the pos method that takes sometime
        this.global.howl.soundOne.volume(0);
        this.global.howl.soundOne.play();
        this.global.howl.soundOne.pos(1, 1, 1);
        this.global.howl.soundOne.stop();

        // Reload the configuration from the local storage
        manageSavedConfiguration();
    }

    create() {
        this.state.start('intro');
    }

}
