import Phaser from 'phaser';

export default class extends Phaser.State {

    create() {
        var nevies = this.add.sprite(this.world.centerX, this.world.centerY, 'neviesTitle');
        nevies.anchor.setTo(0.5, 0.5);
        nevies.alpha = 0;
        var tween = this.add.tween(nevies);
        tween.to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None);
        tween.to({ alpha: 0 }, 2000, Phaser.Easing.Exponential.Out);

        var sounddodgeTitle = this.add.sprite(this.world.centerX, this.world.centerY, 'sounddodgeTitle');
        sounddodgeTitle.anchor.setTo(0.5, 0.5);
        sounddodgeTitle.alpha = 0;
        var tween2 = this.add.tween(sounddodgeTitle);
        tween2.to({
            alpha: 1
        }, 2000, Phaser.Easing.Linear.None);
        tween2.onComplete.addOnce(this.goToMenu, this);
        tween2.to({ alpha: 0 }, 2000, Phaser.Easing.Exponential.Out);

        tween.chain(tween2);

        tween.start();
    }

    goToMenu() {
        this.state.start('menu');
    }

}
