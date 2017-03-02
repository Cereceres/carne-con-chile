module.exports = function(data, dim, numData, mu) {
  console.log('isFunc');
  const _numData = Math.floor(data.length / dim) + 1;
  let sigma = [];
  let point;
  let collect = true;
  let _mu;
  let datum;

  for (let i = 0, len = dim * _numData; i < len; i++) {
    if (i % dim && collect) {
      point.push(data[i % data.length]);
      continue;
    }

    if (i % dim === 0 && collect) {
      point = [];
      point.push(data[i]);
      collect = false;
    }

    if (!i) continue;

    i = i - dim;
    sigma[i % dim] = sigma[i % dim] || 0;
    _mu = mu(point, i % dim);
    datum = data[i] || _mu;
    sigma[i % dim] += (datum - _mu) * (datum - _mu) / numData;

    if (i % dim) collect = true;
  }

  sigma = sigma.map(_sigma => Math.sqrt(_sigma));

  return {mu: mu, sigma: sigma};
};
