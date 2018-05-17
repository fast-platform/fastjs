import Format from './Format';
import Csv from './Csv';
let Export = (() => {
  /**
   *
   * @param {Object} translations
   */
  async function csv({ output, options, data, formioForm, translations, language }) {
    let formattedData = Format.submission({
      output,
      data,
      formioForm,
      translations,
      language
    });

    let file = await Csv.get({ json: formattedData });

    return file;
  }

  return Object.freeze({
    csv
  });
})();

export default Export;
