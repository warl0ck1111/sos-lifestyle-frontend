// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    serverUrl: 'http://localhost:8080',
  apiUrl: 'http://localhost:8080',
  eventName: 'SINGLES-EXPERIENCE',
  ticketPrice: 10000,
  merchantCode: 'MX153157',
  payItemId: 'Default_Payable_MX153157',
  DataRef: 'NhVKGYH0wFp02pnKwD/bG53oZHiKZxUAZhh6ue3U+64RVPiF93bOoSZhrun65+JU',
  clientId: 'IKIA2D8D85D778687535AAE25249C80C9D8FF43D42E1',
  secretKey: 'SVLKn5t5oZFaIO2',
  merchantId: '40771312583345',



  get baseURL(): string {
        const parsedUrl = new URL(window.location.href);
        let baseUrl = parsedUrl.origin;
        return baseUrl;
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
