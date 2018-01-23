import GoogleConfig from './google_auth';

export const login = {};

// export const initClient = function () {
//     console.log('init client');

//     gapi.testje = true;
//     debugger;
//     gapi.client.init({
//         apiKey: 'AIzaSyDHEUcIP4qjCqknXPRa_uqpeAXQvbytzVY',
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/games/v1/rest'],
//         clientId: GoogleConfig.web.client_id,
//         scope: ['https://www.googleapis.com/auth/games']
//     }).then(function (result) {
//         debugger;
//         // Listen for sign-in state changes.
//         // gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//         // Handle the initial sign-in state.
//         // updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//         login.auth = gapi.auth2.getAuthInstance();
//         login.user = login.auth.currentUser.get();
//         console.log('> login ' + login.auth.isSignedIn.get());
//         login.signedIn = login.auth.isSignedIn.get();

//     }).catch(function (er) {
//         debugger;
//         console.error(er);
//     });
// };

// window.handleClientLoad = function () {
//     if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
//         // Mobile
//         // window.plugins.playGamesServices.auth();
//     } else {
//         // Web
//         console.log('>> Start login init handleClientLoad');
//         gapi.load('client:auth2', initClient);
//     }
// };
