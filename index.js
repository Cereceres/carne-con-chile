'use strict';

const getStats = require('./lib/getStats');
const completeData = require('./lib/completeData');
const elipse = require('./lib/elipse-eq');


const outliers = function (arrayOfData = [], dim = 1, numSigma = 1.645, dg = 0, timeSeries) {
  if (arrayOfData.length < 2) return arrayOfData;
  let array = arrayOfData.slice(0);
  const numDatas = Math.ceil(array.length / dim);

  array = completeData(array, numDatas, dim);


  const stats = getStats(array, dim, dg, timeSeries);

  const length = array.length;
  let point;
  let SD;
  arrayOfData.forEach((item, index) => {
    if (index % dim) return;

    point = array.slice(index, index + dim);
    SD = elipse(point, stats);
    if (SD > numSigma) array.splice(index, dim);
  });

  if (array.length !== length) return outliers(array, dim, numSigma, dg, timeSeries);
  return array;
};
exports.outliersRemoving = outliers;
exports.getStats = getStats;
