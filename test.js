const outliers = require('./index').outliersRemoving;
const assert = require('assert');
describe('test to outliers', () => {
  it('should be a function', () => {
    assert(typeof outliers === 'function');
  });

  it('should filter to data of a one dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100]);
    assert(res[9] === 3 && res.length === 10);
  });

  it('should filter to data of a two dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 2);
    assert(res[4] === 3 && res.length === 7);
  });

  it('should filter to data of a three dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 3);
    assert(res[2] === 1 && res.length === 10);
  });
  it('should filter to data of a four dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 4);
    assert(res[5] === 3 && res.length === 11);
  });
  it('should filter to data of a five dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 5);
    assert(res[10] === 100 && res.length === 11);
  });
  it('should filter to data of a six dim', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 2, 1.3);
    assert(res[3] === 2 && res.length === 4);
  });

  it('should filter when the mu is fixed with two dimensions', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 2, 1.3, 1, 3);
    assert(res[6] === 3, res);
  });

  it('should filter when the mu is fixed with three dimensions', () => {
    let res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 3, 1, 1, 5);
    assert(res[1] === 3, res);
  });

  it('should return a array empty if a array is passed', () => {
    let res = outliers();
    assert(!res.length);
  });
});
