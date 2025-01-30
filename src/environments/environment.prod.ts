// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mode: 'LIVE',
  apiUrl: 'https://party-riders-backend-ea7605095392.herokuapp.com',
  eventName: 'SINGLES_EXPERIENCE',
  VIPTicketPrice: 3000000,
  earlyBirdsTicketPrice: 800000,
  standardTicketPrice: 1000000,
  merchantCode: 'MX153682',
  payItemId: 'Default_Payable_MX153682',
  DataRef: 'c0etLdXvIrsfYqgtJSMlvuTL0ybiadm0WdNla+LZKPvX5DYPE2aaRuB3qW5CN7t3',
  clientId: 'IKIA0B9C1721033ECAF8CB2E56F098E9C5606D64062C',
  secretKey: 'NkIcdyhAG6l6Xhz',
  merchantId: '40771312583345',
  crpEndPointServerUrl: 'http://41.207.248.189:8788/api',
  emailReturnBackUrl: 'https://birs.bo.gov.ng/',
  CID: '234927',
  fileUploadMaxSize: 1048576,
  allowedUploadExtentions: ['pdf', 'docx', 'doc', 'png', 'jpg', 'jpeg'],
  remitaFinalizeUrl: 'https://login.remita.net/remita/ecomm/finalize.reg',

  eventDate: "Feb 15, 2025",
  eventLocation: "Sol Beach, Elegushi Beach, Gate 2",
  eventStartTime: "4PM",
  get baseURL(): string {
    const parsedUrl = new URL(window.location.href);
    let baseUrl = parsedUrl.origin;
    return baseUrl;
  }

  // get baseURL(): string {
  //     const parsedUrl = new URL(window.location.href);
  //
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
