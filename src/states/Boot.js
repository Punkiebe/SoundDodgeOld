import Phaser from 'phaser';

export default class extends Phaser.State {

    preload() {
        this.load.image('loadingBar', 'assets/img/menu/loadingBar.png');
        this.load.image('loadingText', 'assets/img/menu/text_loading.png');
    }

    create() {
        this.stage.backgroundColor = '#000000';
        this.physics.startSystem(Phaser.Physics.ARCADE);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        }

        document.body.style.backgroundColor = '#000000';

        this.scale.minWidth = 250;
        this.scale.minHeight = 170;
        this.scale.maxWidth = 960;
        this.scale.maxHeight = 1600;

        this.scale.pageAlignHorizontally = true;
        this.scale.pageAlignVertically = true;
        this.scale.refresh();

        this.state.start('load');
    }

}
