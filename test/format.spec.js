/* global describe, it, before */

import chai from 'chai';
import Format from '../src/Format.js';
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

describe('Given a Form.io form, submissions and translations', () => {
  describe('When I parse the submissions', () => {
    let language = 'en';
    let formattedData = Format.submission({ output, data, formioForm, translations, language });

    it('should get the data', () => {
      expect(JSON.stringify(formattedData.data)).to.be.equal('[{"name":"Juan","age":20},{"name":"Pedro","age":32}]');
    });

    it('should format the Labels and API keys', () => {
      expect(JSON.stringify(formattedData.labels)).to.be.equal(
        '[{"apiKey":"name","label":"Name"},{"apiKey":"age","label":"Age"},{"apiKey":"submit","label":"Submit"},{"apiKey":"ownerEmail","label":"Owner Email"}]'
      );
    });

    it('should give a date formatted as a string', () => {
      expect(JSON.stringify(formattedData.date)).to.be.a('string');
    });
  });

  describe('When I change the language', () => {
    let language = 'de';
    let formattedData = Format.submission({ output, data, formioForm, translations, language });

    it('should format the Labels on that specific language', () => {
      expect(JSON.stringify(formattedData.labels)).to.be.equal(
        '[{"apiKey":"name","label":"Name"},{"apiKey":"age","label":"Alter"},{"apiKey":"submit","label":"Einreichen"},{"apiKey":"ownerEmail","label":"Besitzer E-Mail"}]'
      );
    });
  });
});
