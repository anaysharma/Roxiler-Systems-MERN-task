const getBarchartData = require('../utils/getBarchartData');
const getPiechartData = require('../utils/getPiechartData');
const getStatisticsData = require('../utils/getStatisticsData');

const combined = async (req, res) => {
  const { month } = req.query;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const statistics = await getStatisticsData(month);
    const priceRanges = await getBarchartData(month);
    const categoryData = await getPiechartData(month);

    return res.status(200).json({
      message: 'data retrieval successfull',
      data: {
        ...statistics,
        priceRanges,
        categoryData,
      },
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = combined;
