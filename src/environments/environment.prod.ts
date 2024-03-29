// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    serverUrl: 'https://birs.bo.gov.ng/stateirs/api',
    crpEndPointServerUrl: 'http://41.207.248.189:8788/api',
    emailReturnBackUrl: 'https://birs.bo.gov.ng/',
    CID: '234927',


     //serverUrl: 'http://41.207.248.189:2000/api',
    // crpEndPointServerUrl: 'http://41.207.248.189:8788/api',


    // emailReturnBackUrl:'https://birs.bo.gov.ng/stateirs/',
    fileUploadMaxSize: 1048576,
    allowedUploadExtentions:['pdf','docx','doc','png','jpg','jpeg'],
    remitaFinalizeUrl:'https://login.remita.net/remita/ecomm/finalize.reg',

    get baseURL(): string {
        const parsedUrl = new URL(window.location.href);
        let baseUrl = parsedUrl.origin;
        return baseUrl;
    }

    // get baseURL(): string {
    //     const parsedUrl = new URL(window.location.href);

    //     let baseUrl = parsedUrl.origin;
    //     return baseUrl;
    //   }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
