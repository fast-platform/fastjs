/* global describe, it, before */

import chai from 'chai';

import i18n from '../src/i18n.js';

chai.expect();

const expect = chai.expect;
let i;

describe('Given an instance of i18n library', () => {
  before(() => {
    let translations = {
      en: {
        translation: {
          key: 'hello world'
        }
      },
      de: {
        translation: {
          key: 'hello welt'
        }
      }
    };

    i = i18n.init(translations);
  });
  describe('when I ask for a key', () => {
    it('should give me the translation', () => {
      expect(i.t('key')).to.be.equal('hello world');
    });
  });

  describe('when I change the language', () => {
    it('should give me the translation in that language', () => {
      i.changeLanguage('de');
      expect(i.t('key')).to.be.equal('hello welt');
    });
  });
});
