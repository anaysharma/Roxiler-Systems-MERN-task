const product = require('../models/product');

const getBarchartData = async (month) => {
  const priceRanges = await product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
      },
    },
    {
      $bucket: {
        groupBy: '$price',
        boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
        default: '901 and above',
        output: {
          count: { $sum: 1 },
        },
      },
    },
  ]);

  const ranges = [
    { range: '0-100', min: 0, max: 100 },
    { range: '101-200', min: 100, max: 200 },
    { range: '201-300', min: 200, max: 300 },
    { range: '301-400', min: 300, max: 400 },
    { range: '401-500', min: 400, max: 500 },
    { range: '501-600', min: 500, max: 600 },
    { range: '601-700', min: 600, max: 700 },
    { range: '701-800', min: 700, max: 800 },
    { range: '801-900', min: 800, max: 900 },
    { range: '901 and above', min: 900, max: Infinity },
  ];

  const result = ranges.map((r) => ({ range: r.range, count: 0 }));

  priceRanges.forEach((bucket) => {
    const rangeLabel =
      bucket._id === '901 and above'
        ? '901 and above'
        : `${bucket._id + 1}-${bucket._id + 100}`;
    const rangeObj = result.find((r) => r.range === rangeLabel);
    if (rangeObj) rangeObj.count = bucket.count;
  });

  return result;
};

module.exports = getBarchartData;
