const assert = require('assert');
const outliers = require('../index').outliersRemoving;

describe('test to outliers', () => {
  it('should be a function', () => {
    assert(typeof outliers === 'function');
  });

  it('should filter to data of a one dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 1, 1.6, 1);
    assert(res[9] === 3 && res.length === 10);
  });

  it('should filter to data of a two dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 2);

    assert(res[3] === 2 && res.length === 4);
  });

  it('should filter to data of a three dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 3);

    assert(res[5] === 2 && res.length === 6);
  });

  it('should filter to data of a four dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 4);

    assert(res[3] === 1 && res.length === 4);
  });

  it('should filter to data of a five dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 5);

    assert(res[9] === 3 && res.length === 10);
  });

  it('should filter to data of a six dim', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 6, 1.3);

    assert(res[5] === 1 && res.length === 6);
  });

  it('should filter when the mu is fixed with one dimensions', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 1, 1.3, 1, 3);

    assert(res[6] === 3, res);
  });

  it('should filter when the mu is fixed with two dimensions', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 2, 2, 1, 3);

    assert(res[9] === 3, res);
  });

  it('should filter when the mu is fixed with three dimensions', () => {
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 3, 1, 1, 5);
    assert(res[1] === 3, res);
  });

  it('should filter when the mu is a serie of time', () => {
    const mu = (point, dim) => dim * point[0];
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 3, 2, 1, mu);
    assert(res[1] === 2, res);
  });

  it('should filter when the mu is a serie of time and dimension equal to 4', () => {
    const mu = () => 30;
    const res = outliers([1, 2, 1, 2, 3, 3, 2, 1, 2, 3, 100], 4, 1.6, 1, mu);


    assert(res[7] === 1 && res.length === 8, res);
  });

  it('should return a array empty if a array is passed', () => {
    const res = outliers();
    assert(!res.length);
  });
});
