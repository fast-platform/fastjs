import Configuration from "./models/Configuration";
import Form from "./models/Form";
import Translation from "./models/Translation";
import Pages from "./models/Pages";
import SyncInterval from "./repositories/Database/SyncInterval";
import Roles from "./models/Role";
import { Fluent } from "fast-fluent";
import loki from "./Fluent/Connectors/local/Loki/FluentConnector";
import formio from "fluent-formio";
import formioLoki from "./Fluent/Connectors/merged/Formio-Loki/FluentConnector";
/* eslint-disable no-unused-vars */
let FAST = (() => {
  /**
   * Loads all configuration for the FAST app
   * This is the main start function and mandatory
   * to execute if you will use it!
   *
   * @param {*} conf
   * @param {*} conf.appConf Configuration of the App
   */
  async function start({ appConf, forceOnline }) {
    if (!forceOnline) {
      await Fluent.config({
        REMOTE_CONNECTORS: [
          {
            default: true,
            name: "formio",
            baseUrl: appConf.fluentFormioBaseUrl,
            connector: formio
          },
          {
            name: "formioConfig",
            baseUrl: appConf.appConfigUrl,
            connector: formio
          }
        ],
        LOCAL_CONNECTORS: [
          {
            name: "loki",
            connector: loki,
            default: true
          }
        ],
        MERGE_CONNECTORS: [
          {
            default: true,
            name: "formioLoki",
            connector: formioLoki
          }
        ]
      });
      // SyncInterval.set(3000);
    }
    const config = await Configuration.set({ appConf, forceOnline })
    let promises = [
      Roles.set({ appConf, forceOnline }),
      Pages.set({ appConf, forceOnline }),
      Form.set({ appConf, forceOnline }),
      Translation.set({ appConf, forceOnline })
    ];

    let results = await Promise.all(promises);

    const appTranslations = results[3];

    return {
      config: config,
      translations: appTranslations,
      defaultLanguage: localStorage.getItem("defaultLenguage") || "en"
    };
  }
  /**
   *
   * Triggers a full Online update of all Configuration,
   * Forms, Pages and Roles of the application.
   *
   * @param {Object} conf
   * @param {Object} conf.appConf Configuration of the App
   * @returns
   */
  async function sync({ appConf }) {
    return start({ appConf, forceOnline: true });
  }

  return Object.freeze({
    start,
    sync
  });
})();

export default FAST;
