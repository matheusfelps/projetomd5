// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig:  {
    apiKey: "AIzaSyBOG23vDZpvGCrgywV1-vzhm5GCVXdoqKw",
    authDomain: "ionic-ctrlos.firebaseapp.com",
    databaseURL: "https://ionic-ctrlos.firebaseio.com",
    projectId: "ionic-ctrlos",
    storageBucket: "ionic-ctrlos.appspot.com",
    messagingSenderId: "920445554539",
    appId: "1:920445554539:web:cc4ddeb24c28a455"
  },
  dbjson:"http://localhost:3000/"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
