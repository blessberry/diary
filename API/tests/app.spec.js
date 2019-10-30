import chai from 'chai'
import app from '../../app';

const { expect } = chai;

describe('GET /', () => {
  it('should return a string', () => {
        expect('hello').to.equal('hello');
      });
});