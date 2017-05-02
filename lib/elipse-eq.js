'use strict';

module.exports = function (point, stats) {
  let mu;

  const sd = point.reduce((init, coord, index) => {
    if (!stats.sigma[index % stats.sigma.length]) return init;

    if (typeof stats.mu === 'function') mu = stats.mu(point, index);

    if (typeof stats.mu !== 'function') mu = stats.mu[index % stats.mu.length];


    let SD = (coord - mu) * (coord - mu);
    SD /= stats.sigma[index % stats.sigma.length] * stats.sigma[index % stats.sigma.length];

    return init + SD;
  }, 0);
  return Math.sqrt(sd);
};
