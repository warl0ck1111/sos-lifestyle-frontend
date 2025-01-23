// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  mode: 'TEST',
  apiUrl: 'http://localhost:8080',
  eventName: 'SINGLES-EXPERIENCE',
  ticketPrice: 5000,
  merchantCode: 'MX21696',
  payItemId: '4177785',
  DataRef: 'NhVKGYH0wFp02pnKwD/bG53oZHiKZxUAZhh6ue3U+64RVPiF93bOoSZhrun65+JU',
  clientId: 'IKIA3B827951EA3EC2E193C51DA1D22988F055FD27DE',
  secretKey: 'ajkdpGiF6PHVrwK',
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
