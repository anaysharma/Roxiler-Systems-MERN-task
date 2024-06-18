const product = require('../models/product');

const getStatisticsData = async (month) => {
  const statistics = await product.aggregate([
    {
      $match: {
        $expr: {
          $eq: [{ $month: '$dateOfSale' }, parseInt(month)],
        },
      },
    },
    {
      $facet: {
        totalSaleAmount: [
          {
            $group: {
              _id: null,
              total: { $sum: '$price' },
            },
          },
        ],
        totalSoldItems: [
          {
            $match: {
              sold: true,
            },
          },
          {
            $count: 'count',
          },
        ],
        totalNotSoldItems: [
          {
            $match: {
              sold: false,
            },
          },
          {
            $count: 'count',
          },
        ],
      },
    },
  ]);

  const data = {
    totalSaleAmount: statistics[0].totalSaleAmount[0]
      ? statistics[0].totalSaleAmount[0].total
      : 0,
    totalSoldItems: statistics[0].totalSoldItems[0]
      ? statistics[0].totalSoldItems[0].count
      : 0,
    totalNotSoldItems: statistics[0].totalNotSoldItems[0]
      ? statistics[0].totalNotSoldItems[0].count
      : 0,
  };

  return data;
};

module.exports = getStatisticsData;
