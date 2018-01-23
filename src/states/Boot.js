import Phaser from 'phaser';
import { initClient } from '../login';

export default class extends Phaser.State {

    preload() {
        this.load.image('loadingBar', 'assets/img/menu/loadingBar.png');
        this.load.image('loadingText', 'assets/img/menu/text_loading.png');
    }

    create() {
        this.stage.backgroundColor = '#000000';
        this.physics.startSystem(Phaser.Physics.ARCADE);

        if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
            // Mobile
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

        debugger;

        window.plugins.googleplus.login(
            {
                'scopes': 'https://www.googleapis.com/auth/games https://www.googleapis.com/auth/profiles', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
                // 'webClientId': '996699697832-amhakrljbgif3kqumr0fiphb3qjer53a.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                // 'webClientId': '996699697832-83q60g3a1li9nlpmmp682q5ourh0rr39.apps.googleusercontent.com', // optional - clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
                'offline': false // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
            },
            function (obj) {
                alert(JSON.stringify(obj)); // do something useful instead of alerting
            },
            function (msg) {
                alert('error: ' + msg);
            }
        );

        //window.plugins.playGamesServices.auth();
        // if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        //     // Mobile
        // } else {
        //     // Web
        //     console.log('>> Start login init (boot.js)');
        //     debugger;
        //     gapi.load('client:auth2', initClient);
        // }

        this.state.start('load');
    }

}
