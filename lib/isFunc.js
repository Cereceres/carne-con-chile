module.exports = function (data, dim, numData, mu) {
  const NumData = Math.ceil(data.length / dim);
  let sigma = [];
  let point;
  let Mu;
  let datum;
  let pivot;
  let index;
  let indexData;

  for (let i = 0, len = dim * NumData; i < len; i += 1) {
    if (i % dim === 0) {
      point = data.slice(i, i + dim);
      index = i % dim;
      indexData = Math.floor(i / dim);
    }


    sigma[i % dim] = sigma[i % dim] || 0;

    Mu = mu(point, index, indexData);

    datum = data[i] || Mu;

    pivot = (datum - Mu) * (datum - Mu);
    pivot /= numData;
    sigma[i % dim] += pivot;
  }

  sigma = sigma.map(_sigma => Math.sqrt(_sigma));

  return { mu, sigma };
};
