const assert = require('assert');
const stats = require('../lib/getStats');

describe('Getstats - tests', () => {
  it('should be a function', () => {
    assert(typeof stats === 'function');
  });

  it('should filter to data of a one dim', () => {
    const res = stats([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 1, 1);
    assert(res.mu[0] === 10.90909090909091);
    assert(res.sigma[0] === 29.558262957943064);
  });
});
