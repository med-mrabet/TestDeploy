// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { LogLevel } from "@azure/msal-browser";

export const environment = {
  production: false,
  hmr: false,
  apiUrl: 'https://localhost:7068/',

  msaConfiguration: {
    auth: {
      tenantId: "1e724250-f24d-4202-8de4-675e0245a500",
      authority: "https://login.microsoftonline.com/",
      redirectUri: "/",
      clientId: "fba3c3da-deaa-4de9-9a7c-3a3a940ee1f3",
    },

    system: {
      loggerOptions: {
        loggerCallback(logLevel, message: string) {
          console.log(message);
        },
        logLevel: LogLevel.Verbose,
      },
    },
  },
  protectedResourceMap: new Map([
    ["https://graph.microsoft.com/v1.0/me", ["Access_User"]],
    ["https://api.myapplication.com/users/*", ["Access_User"]],
    //   ["https://vacancielapi.free.beeceptor.com/*", ["user.read"]],
    // //['https://localhost:4200/*', ['user.read']],
    // //['https://localhost:44336/*', ['user.read']]
    // ["https://localhost:7269/*", ["api://fba3c3da-deaa-4de9-9a7c-3a3a940ee1f3/access_as_user"]],
     ["https://localhost:7068/*", ["api://fba3c3da-deaa-4de9-9a7c-3a3a940ee1f3/access_as_user"]],
     ["https://dev-panotin-admin-back-app.azurewebsites.net/*", ["api://fba3c3da-deaa-4de9-9a7c-3a3a940ee1f3/access_as_user"]],
  ]),
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
