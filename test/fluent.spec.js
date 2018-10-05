/* global describe, it, before */
import 'babel-polyfill';
import chai from 'chai';
import Configuration from '../src/database/models/Configuration';
chai.expect();
const expect = chai.expect;

describe('Given a FAST Model', () => {
  it('name should be Private', () => {
    expect(Configuration.name).to.be.equal(undefined);
  });

  it('name should visible using getter', () => {
    expect(Configuration.getModelName()).to.be.equal('Configuration');
  });

  it('Should be composable overwriting properties', async () => {
    expect(Configuration.getModelName()).to.be.equal('Configuration');
  });

  it('Should get local data', async () => {
    let data = await Configuration.local().all();

    expect(data[0].project).to.be.equal('FAST');
  });
});
