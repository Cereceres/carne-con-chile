module.exports = function(data, dim, numData, mu) {
  let sigma = [];
  const _numData = Math.floor(data.length / dim) + 1;
  let datum;
  for (let i = 0, len = dim * _numData; i < len; i++) {
    sigma[i % dim] = sigma[i % dim] || 0;
    datum = data[i] || mu;
    sigma[i % dim] += (datum - mu) * (datum - mu) / numData;
  }

  sigma = sigma.map(_sigma => Math.sqrt(_sigma));

  return {mu: [mu], sigma: sigma};
};
