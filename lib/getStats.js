const isConst = require('./isConst');
const isFunc = require('./isFunc');

module.exports = function(data, dim, dg, timeSeries) {
  dim = dim || 1;
  let numData = Math.floor(data.length / dim);
  if (numData * dim !== data.length) numData += 1;
  dg = dg || 0;
  const mu = timeSeries || [];

  if (typeof mu === 'number') return isConst(data, dim, numData - dg, mu);

  if (typeof mu === 'function') return isFunc(data, dim, numData - dg, mu);

  let sigma = [];
  let datum;

  for (let i = 0, len = numData * dim; i < len; i++) {
    mu[i % dim] = mu[i % dim] || 0;
    datum = data[i] || mu[i % dim];
    mu[i % dim] += datum / numData;
  }
  for (let i = 0, len = numData * dim; i < len; i++) {
    sigma[i % dim] = sigma[i % dim] || 0;
    if (data[i] === undefined) continue;
    sigma[i % dim] += (data[i] - mu[i % dim]) *
    (data[i] - mu[i % dim]) / numData;
  }

  sigma = sigma.map(_sigma => Math.sqrt(_sigma));
  return {mu: mu, sigma: sigma};
};
