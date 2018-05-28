# FASTjs

A JS library to give you wrapper Functions on top of Form.io. It creates all the necesary classes for you to use your Form.io forms as they were Models, working both online and offline

FASTjs + Form.io will help you develop faster in any Framework

### Installing

To install this package in your project, you can use the following command within your terminal.
FASTjs is quite big (3MB not minified), because we use quite a few libraries, but we do most
of the heavy lifting for you. On time we will work to make the package smaller (We promise!)

```
npm install --save fast-fastjs
```

# Usage

The main function of FASTjs is FAST, this function will initialize all configurations, translations and forms that you have in your Form.io project and will load them into the local LokiJs DB.

An example of the init for a Vue application

```javascript
import {FAST} from 'fast-fastjs';

let config = await FAST.start(
		{
        	Vue,             // {Vue} Your Vue instance (will create Vue.prototype.$FAST_CONFIG)
            interval,        // {Boolean} Whether to initiate the App with the Sync interval
            appConf          // {Object} Configuration for the FASTjs library
        }
    );
```

### The appConfig variable

The config variable can be placed in two different ways: Directly as an object or as a remote Form.io submission.

We give the flexibility to pull the configuration every time we start the project specially for those mobile applications that we do not want to re-deploy every time we change a small configuration of the App. With the remote approach you can just simple update your Form.io Submission and the application will pull it for you.

```javascript
// If we want to directly pass all configuration from here
  let appConf = {
    type: 'local',                     // {String} type of config "remote" or "local"
    config                             // {Object} full configuration of the App (check below)
    translations: TRANSLATIONS         // {Object} i18n translations for the app
  };

// If we are storing our project configuration in Form.io
  let appConfigUrl = 'https://ydvyhgtgqlcasur.form.io/configuration/submission/'

  let appConf = {
    type: 'remote',                // {String} type of config "remote" or "local"
    appConfigId: '',               // {String} ID of the submission that has the config
    appConfigUrl,                  // {String} Full URL tot he Form.io Form with the config
    translations: TRANSLATIONS     // {Object} i18n translations for the App
  };
```

In case you are using local config, your config object should look like this

| Ouput String                      | Values                                         | Description                                        |
| --------------------------------- | ---------------------------------------------- | -------------------------------------------------- |
| project                           | {String} 'MyApp'                               | Name of the project                                |
| APP_ENV                           | {String} 'prod', 'dev'                         | Current Environment of the App ('prod', 'dev')     |
| FAST_VERSION                      | {String} '0.11.0'                              | Version of the FAST App used                       |
| IS_SURVEY                         | {Bolean}                                       | Set the app as Data Collection                     |
| TAB_MENU                          | {Bolean}                                       | Should the pages display as Tabs?                  |
| HAS_SCORES                        | {Bolean}                                       | Do the surveys have scores?                        |
| HAS_ABOUT                         | {Bolean}                                       | Does they App have an About page?                  |
| HAS_REPORT                        | {Bolean}                                       | Do the surveys have a Report page?                 |
| SAVE_REDIRECT                     | {String} 'collected'                           | Where should we redirect after save                |
| APP_URL                           | {String} https://uiprzrzfcxygdno.form.io       | What is the Form.io URL for the project?           |
| APP_NAME                          | {String} 'uiprzrzfcxygdno'                     | What is the Form.io app name (Check App url)       |
| APP_FANTACY_NAME                  | {String} 'MyBApp'                              | The custom name to display in the App              |
| APP_NAME_DRAWER                   | {String} 'MyBApp'                              | The custom name to display in the App left Drawer  |
| APP_PHRASE                        | {String} 'A meaningful app'                    | The phrase of the app                              |
| APP_ABOUT_NAME                    | {String} 'MyApp'                               | Name to display for the ABOUT link                 |
| MD5_KEY                           | {String}Md5 '2448A2EF5FA031F4DC740C90C6A328B0' | MD5 key for hashing                                |
| LOCAL_DB_PASSWORD                 | {String} 'MySec!ur!Pas'                        | Password to access local Loki DB                   |
| HEARTBEAT_URL                     | {String} 'http://localhost:3000/'              | URL to check the connection Status                 |
| SYNC_INTERVAL                     | {Int} 2000                                     | Miliseconds to wait until the next Sync            |
| MULTILANGUAGE                     | {Bolean}                                       | Is the app multilanguage?                          |
| LOCAL_DRAFT_ENABLED               | {Bolean}                                       | Should we allow Local Draft submissions            |
| PARALLEL_SURVEYS                  | {Bolean}                                       | Enable the paeallel surveys functionality?         |
| NAVIGATION_OPENED                 | {Bolean}                                       | Should the page navegation start opened?           |
| NAVIGATION_AUTOCLOSE_ON_SELECTION | {Bolean}                                       | After selecting a page, should the page nav close? |
| DATA_REVIEWERS                    | {Bolean}                                       | Does the app need DataReviewers functionality?     |

If you are using Form.io to manage the config, you can use the following form to hold your configurations.

Remember to import this in your own Form.io Project.
Example config [(View it here!)](https://fast-app-config.stackblitz.io/)
