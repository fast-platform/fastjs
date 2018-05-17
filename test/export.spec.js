import 'babel-polyfill';
import chai from 'chai';
import Exporter from '../src/Exporter.js';
import formioForm from './testForm.json';

chai.expect();

const expect = chai.expect;

let translations = {
  en: {
    translation: {
      Name: 'Name',
      Age: 'Age',
      Submit: 'Submit',
      'Owner Email': 'Owner Email'
    }
  },
  de: {
    translation: {
      Name: 'Name',
      Age: 'Alter',
      Submit: 'Einreichen',
      'Owner Email': 'Besitzer E-Mail'
    }
  }
};
let output = 'csv';
let data = [{ name: 'Juan', age: 20 }, { name: 'Pedro', age: 32 }];
let file;

describe('Given a Form.io form, submissions and translations', () => {
  before(async () => {
    let language = 'en';

    file = await Exporter.csv({ output, data, formioForm, translations, language });
  });

  describe('When I parse the JSON data array', () => {
    it('should get the parsed CSV back', () => {
      expect(file.csv).to.be.equal('Name;Age\r\nname;age\r\nJuan;20\r\nPedro;32');
    });
  });

  describe('When I parse the JSON data array in different Language', () => {
    it('should get the parsed CSV back in that language', async () => {
      let language = 'de';

      file = await Exporter.csv({ output, data, formioForm, translations, language });
      expect(file.csv).to.be.equal('Name;Alter\r\nname;age\r\nJuan;20\r\nPedro;32');
    });
  });
});
