'use strict';

module.exports = function completeData(data, numData, dim) {
  const totalData = numData * dim;
  if (totalData > data.length) data = data.concat(data.slice(0, totalData - data.length));
  if (totalData > data.length) return completeData(data, numData, dim);
  return data;
};
