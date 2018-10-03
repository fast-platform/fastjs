/* global describe, it, before */
import 'babel-polyfill';
import chai from 'chai';
import SyncHelper from '../src/database/helpers/SyncHelper.js';

const expect = chai.expect;
let Sync;

describe('Given an Instance of SyncHelper', () => {
  before(async () => {
    Sync = SyncHelper;
  });

  it('It should remove null values recursively from an Object', () => {
    let object = {
      property: 'val1',
      property1: null,
      nested: {
        property: 'val1',
        property1: null,
        nested: {
          property: 'val1',
          property1: null,
          nested: {
            property: 'val1',
            property1: null
          }
        }
      }
    };
    let test = Sync.deleteNulls(object);
    let expected = {
      property: 'val1',
      nested: {
        property: 'val1',
        nested: {
          property: 'val1',
          nested: {
            property: 'val1'
          }
        }
      }
    };

    expect(test).to.deep.equal(expected);
  });
});
