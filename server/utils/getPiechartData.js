const product = require('../models/product');

const getPiechartData = async (month) => {
  const categoryData = await product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
      },
    },
    {
      $group: {
        _id: '$category',
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        category: '$_id',
        count: 1,
      },
    },
  ]);

  return categoryData;
};

module.exports = getPiechartData;
