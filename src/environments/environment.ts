// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  isMock: true,
  production: false,
  scanApiPath: 'http://163.17.136.70:5000/post_submit',
  nutcApi: 'https://dsl250170.nutc.edu.tw:5054/NutcTempApi',
  HOT: 37.5,
  COOL: 35
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
