const isConst = require('./isConst');
const isFunc = require('./isFunc');

module.exports = function (data, dim = 1, dg = 0, timeSeries) {
  const numData = Math.ceil(data.length / dim);
  const mu = timeSeries || [];

  if (typeof mu === 'number') return isConst(data, dim, numData - dg, mu);


  if (typeof mu === 'function') return isFunc(data, dim, numData - dg, mu);

  let sigma = [];
  let datum;

  for (let i = 0, len = numData * dim; i < len; i += 1) {
    mu[i % dim] = mu[i % dim] || 0;
    datum = data[i] || mu[i % dim];
    mu[i % dim] += datum / numData;
  }
  let pivot;
  for (let i = 0, len = numData * dim; i < len; i += 1) {
    sigma[i % dim] = sigma[i % dim] || 0;
    if (data[i] === undefined) continue;
    pivot = (data[i] - mu[i % dim]) * (data[i] - mu[i % dim]);
    pivot /= numData - dg;
    sigma[i % dim] += pivot;
  }

  sigma = sigma.map(_sigma => Math.sqrt(_sigma));
  return { mu, sigma };
};
