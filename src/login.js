import GoogleConfig from './google_auth';
import gapi from 'gapi';

export const login = {};

export const initClient = function () {

    gapi.client.init({
        apiKey: 'AIzaSyDHEUcIP4qjCqknXPRa_uqpeAXQvbytzVY',
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/games/v1/rest'],
        clientId: GoogleConfig.web.client_id,
        scope: ['games']
    }).then(function () {
        // Listen for sign-in state changes.
        // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
        // Handle the initial sign-in state.
        // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        console.log('> login ' + gapi.auth2.getAuthInstance().isSignedIn.get());
        login.signedIn = gapi.auth2.getAuthInstance().isSignedIn.get();
    });
};

window.handleClientLoad = function () {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        // Mobile
        // window.plugins.playGamesServices.auth();
    } else {
        // Web
        console.log('>> Start login init handleClientLoad');
        gapi.load('client:auth2', initClient);
    }
};
