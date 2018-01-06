import GoogleConfig from './google_auth';
import gapi from 'gapi';

export const login = {};

export const initClient = function () {

    gapi.client.init({
        apiKey: GoogleConfig.web.project_id,
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
