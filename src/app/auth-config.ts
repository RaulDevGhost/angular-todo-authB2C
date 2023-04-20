/**
 * This file contains authentication parameters. Contents of this file
 * is roughly the same across other MSAL.js libraries. These parameters
 * are used to initialize Angular and MSAL Angular configurations in
 * in app.module.ts file.
 */

import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;

/**
 * Enter here the user flows and custom policies for your B2C application,
 * To learn more about user flows, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/user-flow-overview
 * To learn more about custom policies, visit https://docs.microsoft.com/en-us/azure/active-directory-b2c/custom-policy-overview
 */

//https://testraultest.b2clogin.com/testraultest.onmicrosoft.com/oauth2/v2.0/authorize?p=B2C_1_signupsigninraultest&client_id=54840c6a-13f0-4d49-9e65-6c1316ed2f99&nonce=defaultNonce&redirect_uri=http%3A%2F%2Flocalhost%3A4200%2F&scope=openid&response_type=code&prompt=login&code_challenge_method=S256&code_challenge=3ZSzYavR_rU0JTqq6LeymKOQiC0Cx7u6rqpmoFEYGHQ
export const b2cPolicies = {
    names: {
        signUpSignIn: 'B2C_1_signupsigninraultest',
        resetPassword: 'B2C_1_resetpassword_raultest',
        editProfile: 'B2C_1_editprofile_raultest',
    },
    authorities: {
        signUpSignIn: {
            authority: 'https://testraultest.b2clogin.com/testraultest.onmicrosoft.com/B2C_1_signupsigninraultest',
        },
        resetPassword: {
            authority: 'https://testraultest.b2clogin.com/testraultest.onmicrosoft.com/B2C_1_resetpassword_raultest',
        },
        editProfile: {
            authority: 'https://testraultest.b2clogin.com/testraultest.onmicrosoft.com/B2C_1_editprofile_raultest',
        },
    },
    authorityDomain: 'testraultest.b2clogin.com',
};

/**
 * Configuration object to be passed to MSAL instance on creation.
 * For a full list of MSAL.js configuration parameters, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/configuration.md
 */
export const msalConfig: Configuration = {
    auth: {
        clientId: '54840c6a-13f0-4d49-9e65-6c1316ed2f99', // This is the ONLY mandatory field that you need to supply.
        authority: b2cPolicies.authorities.signUpSignIn.authority, // Defaults to "https://login.microsoftonline.com/common"
        knownAuthorities: [b2cPolicies.authorityDomain], // Mark your B2C tenant's domain as trusted.
        redirectUri: '/auth', // Points to window.location.origin by default. You must register this URI on Azure portal/App Registration.
        postLogoutRedirectUri: '/', // Points to window.location.origin by default.
    },
    cache: {
        cacheLocation: BrowserCacheLocation.LocalStorage, // Configures cache location. "sessionStorage" is more secure, but "localStorage" gives you SSO between tabs.
        storeAuthStateInCookie: isIE, // Set this to "true" if you are having issues on IE11 or Edge. Remove this line to use Angular Universal
    },
    system: {
        /**
         * Below you can configure MSAL.js logs. For more information, visit:
         * https://docs.microsoft.com/azure/active-directory/develop/msal-logging-js
         */
        loggerOptions: {
            loggerCallback(logLevel: LogLevel, message: string) {
                console.log(message);
            },
            logLevel: LogLevel.Verbose,
            piiLoggingEnabled: false
        }
    }
}

/**
 * Add here the endpoints and scopes when obtaining an access token for protected web APIs. For more information, see:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-browser/docs/resources-and-scopes.md
 */
export const protectedResources = {
  apiTodoList: {
      endpoint: "https://precious-daifuku-54bc4c.netlify.app/api/todos",
      scopes: {
          /*read: ["https://testraultest.onmicrosoft.com/TodoList/ToDoList.Read"],
          write: ["https://testraultest.onmicrosoft.com/TodoList/ToDoList.ReadWrite"]*/
          read: ["https://testraultest.onmicrosoft.com/raulscope/api/todos.write"],
          write: ["https://testraultest.onmicrosoft.com/raulscope/api/todos.write"]
      }
  }
}






/**
* Scopes you add here will be prompted for user consent during sign-in.
* By default, MSAL.js will add OIDC scopes (openid, profile, email) to any login request.
* For more information about OIDC scopes, visit:
* https://docs.microsoft.com/en-us/azure/active-directory/develop/v2-permissions-and-consent#openid-connect-scopes
*/
export const loginRequest = {
  scopes: ['email']
};
