'use strict';

const getStats = require('./lib/getStats');

const outliers = function(array, dim, numSigma, dg, timeSeries) {
  dg = dg || 0;
  array = array || [];
  if (!array.length) return array;

  numSigma = numSigma || 1.645;

  !Array.isArray(numSigma) && (numSigma = [numSigma]);

  !dim && (dim = 1);

  const stats = getStats(array, dim, dg, timeSeries);

  const length = array.length;
  const _numSigma = [];
  let point;

  array = array.filter((item, index) => {
    _numSigma[index % dim] = _numSigma[index % dim] ||
    numSigma[index % numSigma.length] * stats.sigma[index % dim];

    if (Array.isArray(stats.mu)) {
      return Math.abs(item - stats.mu[index % stats.mu.length]) <=
    _numSigma[index % _numSigma.length];
    }
    if (index % dim) point = array.slice(index, dim);
    console.log('point', point);
    return Math.abs(item - stats.mu(point, index % dim)) <=
    _numSigma[index % _numSigma.length];
  });

  if (array.length !== length) return outliers(array, dim, numSigma, dg, timeSeries);
  return array;
};
exports.outliersRemoving = outliers;
exports.getStats = getStats;
