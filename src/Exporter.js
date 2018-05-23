import Format from './Format';
import Csv from './Csv';

let Export = (() => {
  function preFormatData(submissions) {
    submissions = submissions.map((o) => {
      if (!o.data) {
        return o;
      }
      if (o.data.submit) {
        delete o.data.submit;
      }
      if (o._id && o._id.indexOf('_local') >= 0) {
        o.data._lid = o._id;
      }
      if (o.data && !o.data._id) {
        o.data._id = o._id;
      }
      if (o.data && !o.data.owner) {
        o.data.owner = o.owner;
      }

      if (o.data && !o.data.modified) {
        o.data.modified = o.modified;
      }

      if (o && o.owner && o.owner.data && o.owner.data.email) {
        o.data.ownerEmail = o.owner.data.email;
      }
      if (o && o.user_email) {
        o.data.ownerEmail = o.user_email;
      }

      o.data._id = o._id;
      return o.data;
    });
    return submissions;
  }
  /**
   *
   * @param {Object} translations
   */
  async function csv({ output, options, data, formioForm, translations, language }) {
    data = preFormatData(data);

    let formattedData = Format.submission({
      output,
      data,
      formioForm,
      translations,
      language
    });

    let args = {};

    args.json = formattedData;

    if (options && options.rawArray) {
      args.rawArray = true;
    }

    let file = await Csv.get(args);

    return file;
  }

  async function format({ output, options, data, formioForm, translations, language }) {
    return Format.submission({
      output,
      data,
      formioForm,
      translations,
      language
    });
  }

  return Object.freeze({
    csv,
    format
  });
})();

export default Export;
