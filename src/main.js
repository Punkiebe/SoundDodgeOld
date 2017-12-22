import 'pixi';
import 'p2';
import Phaser from 'phaser';

import BootState from './states/boot';
import LoadState from './states/load';
import IntroState from './states/intro';
import MenuState from './states/menu';
import OptionsState from './states/options';
import SelectionState from './states/selection';
import LevelState from './states/level';
import SelectionDebugLevelState from './states/selectionDebugLevel';
import DebugLevelState from './states/debugLevel';

import config from './config';

class Game extends Phaser.Game {

    constructor() {

        var width = config.gameWidth;
        var height = config.gameHeight;

        // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //     // Mobile so execute the width / height adaption

        //     // get both w and h of the screen
        //     // (some devices/browser measure this differntly, so you dont know for sure which one is which)
        //     var w = window.innerWidth * window.devicePixelRatio;
        //     var h = window.innerHeight * window.devicePixelRatio;

        //     // get the actual w and h. in landscape we'll define w as the longest one
        //     width = Math.max(w, h);
        //     height = Math.min(w, h);
        //     // Do we need to scale to fit in width?
        //     if (width > config.gameWidth) {
        //         var ratioWidth = config.gameWidth / width;
        //         width *= ratioWidth;
        //         height *= ratioWidth;
        //     }

        //     // Do we need to scale to fit in height?
        //     if (height > config.gameHeight) {
        //         var ratioHeight = config.gameHeight / height;
        //         width *= ratioHeight;
        //         height *= ratioHeight;
        //     }
        // }

        // var game = new Phaser.Game(480, 800, Phaser.CANVAS, 'gameDiv');
        super(width, height, Phaser.AUTO, 'content', null);

        this.global = {
            camera: { width: 480, height: 800 },
            howl: { soundOne: null },
            difficulty: { EASY: { speed: 3, page: 0 }, NORMAL: { speed: 4, page: 1 }, HARD: { speed: 7, page: 2 } },
            configuration: {
                volume: 0.5,
                completedLevels: { EASY: [], NORMAL: [], HARD: [] }
            },
            totalNumberOfLevels: 5, // max supports 30 for the moment
            debug: true,
            lastSelectedDifficulty: null
        };

        this.styles = {
            default: {
                font: '50px Audiowide',
                fill: '#ff0000',
                align: 'center'
            },
            winCondition: {
                font: '50px Audiowide',
                fill: '#00ff00',
                align: 'center'
            }
        };

        this.state.add('boot', BootState);
        this.state.add('load', LoadState);
        this.state.add('intro', IntroState);
        this.state.add('menu', MenuState);
        this.state.add('options', OptionsState);
        this.state.add('selection', SelectionState);
        this.state.add('level', LevelState);
        this.state.add('selectionDebugLevel', SelectionDebugLevelState);
        this.state.add('debugLevel', DebugLevelState);

        // this.state.start('boot');
    }

}

export const game = new Game();

window.game = game;
