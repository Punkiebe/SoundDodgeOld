import Phaser from 'phaser';
import jQuery from 'jquery';
import { game } from './main.js';

const SoundBoxSprite = function (name, posX, posY, scaleX, scaleY) {
    Phaser.Sprite.call(this, game, posX, posY, 'pixelArea');
    this.scale.set(scaleX, scaleY);
    this.name = name;
    this.anchor.setTo(0.5, 0.5);
    this.addSoundSource = function (name, posX, posY, scaleX, scaleY) {
        this.soundSource = new Phaser.Sprite(game, posX, posY, 'pixelSource');
        this.soundSource.scale.set(scaleX, scaleY);
        this.soundSource.name = name;
        this.soundSource.anchor.setTo(0.5, 0.5);
    };
};

SoundBoxSprite.prototype = Object.create(Phaser.Sprite.prototype);
SoundBoxSprite.prototype.constructor = SoundBoxSprite;

export const buildLevel = function (jsonFileName, levelObj) {
    jQuery.getJSON(jsonFileName)
        .done(function (jsonMap) {
            createMapForLevel(jsonMap, levelObj);
        })
        .fail(function (jqxhr, textStatus, error) {
            var err = textStatus + ', ' + error;
            console.log('Request Failed: ' + err);
        });
};

const createMapForLevel = function (jsonMap, levelObj) {
    console.debug('Start building the map for the level.');
    if (levelObj.mapLoaded === true) {
        console.error('Map was already loaded!!');
        alert('Map already loaded should never happen!!!');
    }

    game.world.setBounds(jsonMap.worldBounds[0], jsonMap.worldBounds[1], jsonMap.worldBounds[2], jsonMap.worldBounds[3]); // Sets the size of our world

    /** *** Soundboxes *****/
    levelObj.areaBoxes = game.add.group();
    levelObj.areaBoxes.enableBody = true;
    if (game.global.debug === false) {
        levelObj.areaBoxes.alpha = 0;
    }
    levelObj.sourceBoxes = game.add.group();
    levelObj.sourceBoxes.enableBody = true;
    if (game.global.debug === false) {
        levelObj.sourceBoxes.alpha = 0;
    }
    soundBoxesBuilder(jsonMap, levelObj.areaBoxes, levelObj.sourceBoxes);

    /** *** End bar *****/
    levelObj.endBar = game.add.sprite(jsonMap.endBox[0], jsonMap.endBox[1], 'pixelSource');
    levelObj.endBar.scale.setTo(jsonMap.endBox[2], jsonMap.endBox[3]);
    game.physics.arcade.enableBody(levelObj.endBar);
    if (game.global.debug === false) {
        levelObj.endBar.alpha = 0;
    }

    /** *** Player *****/
    levelObj.player = game.add.sprite(jsonMap.startPlayer[0], jsonMap.startPlayer[1], 'pixelPlayer');
    levelObj.player.anchor.setTo(0.5, 0.5);
    // levelObj.player.scale.setTo(40, 40);
    game.physics.arcade.enableBody(levelObj.player);
    levelObj.player.body.collideWorldBounds = true;
    levelObj.player.inputEnabled = true;
    // levelObj.player.input.enableDrag(true, true);
    // levelObj.player.input.consumePointerEvent = true;
    // levelObj.player.input.onDown.add(this.playerClicked, this);

    levelObj.player.events.onInputDown.add(levelObj.playerClickedOn, levelObj);
    levelObj.player.events.onInputDown.add(levelObj.startLevelClick, levelObj);
    levelObj.player.events.onInputUp.add(levelObj.playerClickedOff, levelObj);
    levelObj.playerfollow = false;

    levelObj.mapLoaded = true;
};

const soundBoxesBuilder = function (level, soundGroup, endGroup) {
    console.log(level);
    for (var i = 0; i < level.soundBoxes.length; i++) {
        console.log('box : ' + i + ' = ' + level.soundBoxes[i]);

        var soundbox = new SoundBoxSprite(level.soundBoxes[i].soundArea[0], level.soundBoxes[i].soundArea[1], level.soundBoxes[i].soundArea[2], level.soundBoxes[i].soundArea[3], level.soundBoxes[i].soundArea[4]);
        soundbox.addSoundSource(level.soundBoxes[i].endArea[0], level.soundBoxes[i].endArea[1], level.soundBoxes[i].endArea[2], level.soundBoxes[i].endArea[3], level.soundBoxes[i].endArea[4]);

        soundGroup.add(soundbox);
        endGroup.add(soundbox.soundSource);

    }
    console.log('Endbox : ' + level.endBox);
};

export const roundNumber = function (value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

/*
Function that enables swiping.
Give the functions that you want that are called as parameters.
First for left swipe, then right, up and down.
These function we'll be given two parameters first direction and then distance.
*/
export const activateSwipeFunctionality = function (fnSwipeLeft, fnSwipeRight, fnSwipeUp, fnSwipeDown) {

    // Logic for the swipe
    var swipeCoordX, swipeCoordY, swipeCoordX2, swipeCoordY2, swipeMinDistance = 100;

    this.game.input.onDown.add(function (pointer) {
        swipeCoordX = pointer.clientX;
        swipeCoordY = pointer.clientY;
    }, this);

    this.game.input.onUp.add(function (pointer) {
        swipeCoordX2 = pointer.clientX;
        swipeCoordY2 = pointer.clientY;
        if (swipeCoordX2 < swipeCoordX - swipeMinDistance) {
            console.log('left');
            if (fnSwipeLeft) {
                fnSwipeLeft.bind(this)('left', (swipeCoordX - swipeCoordX2));
            }
        } else if (swipeCoordX2 > swipeCoordX + swipeMinDistance) {
            console.log('right');
            if (fnSwipeRight) {
                fnSwipeRight.bind(this)('right', (swipeCoordX2 - swipeCoordX));
            }
        } else if (swipeCoordY2 < swipeCoordY - swipeMinDistance) {
            console.log('up');
            if (fnSwipeUp) {
                fnSwipeUp.bind(this)('up', (swipeCoordY - swipeCoordY2));
            }
        } else if (swipeCoordY2 > swipeCoordY + swipeMinDistance) {
            console.log('down');
            if (fnSwipeDown) {
                fnSwipeDown.bind(this)('down', (swipeCoordY2 - swipeCoordY));
            }
        }
    }, this);
};

/*
Checks if the level is completed for the given level number and difficulty.
*/
export const checkIfLevelCompleted = function (lvlNbr, difficulty) {
    var completedLevels = game.global.configuration.completedLevels[difficulty];
    for (var lvl of completedLevels) {
        if (lvl === lvlNbr) {
            return true;
        }
    }
    return false;
};

/*
Saves the complete configuration object. (game.global)
*/
export const saveConfiguration = function () {
    localStorage.setItem('nevies.sounddodge.configuration', JSON.stringify(game.global.configuration));
};

/*
Check if the object for the completed levels is already saved, if so get the info and use it.
*/
export const manageSavedConfiguration = function () {
    var savedConfigStr = localStorage.getItem('nevies.sounddodge.configuration');
    var savedConfig = JSON.parse(savedConfigStr);
    console.log('Saved config : ' + savedConfig);
    if (savedConfig) {
        // copy all that is oké to safely use
        game.global.configuration.volume = savedConfig.volume;
        game.global.configuration.completedLevels = savedConfig.completedLevels;
    }
};
