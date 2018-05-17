/* global describe, it, before */
import 'babel-polyfill';
import chai from 'chai';
import CSV from '../src/CSV.js';

chai.expect();

const expect = chai.expect;
let file;

import JsonFormattedSubmissions from './testFormatedData.json';

describe('Given a Json formatted submission', () => {
  before(async () => {
    file = await CSV.get({ json: JsonFormattedSubmissions });
  });
  describe('when we export it to CSV', () => {
    it('should parse the CSV', () => {
      expect(file.csv).to.be.equal('Name;Age\r\nname;age\r\nJuan;20\r\nPedro;32');
    });

    it('should get the name of the file', () => {
      expect(file.name).to.be.equal('backup_2018_05_17_12_02_45');
    });
  });
});
