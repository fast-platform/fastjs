import 'babel-polyfill';
import { Event } from '../src/index.js';
import chai from 'chai';

const expect = chai.expect;

describe('Given an instance of the Event class', () => {
  before(() => {});
  describe('When I load the library', () => {
    it('should give me the instanse', () => {
      console.log('Event', Event);
      expect('key').to.be.equal('key');
    });
  });
});
