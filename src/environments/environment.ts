// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  resourceServerURL:'https://pjljlkht13.execute-api.ap-south-1.amazonaws.com/prod/',
  cognito: {
    userPoolId: 'ap-south-1_VNkH4iNVO',
    userPoolWebClientId: '5300trf47gj90nl6h98u7lq5n2'
  }
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
