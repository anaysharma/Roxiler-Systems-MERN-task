const getStatisticsData = require('../utils/getStatisticsData');

const statistics = async (req, res) => {
  const { month } = req.query;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const data = await getStatisticsData(month);

    return res
      .status(200)
      .json({ message: 'transaction retrieval successfull', data });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'error getting transactions' });
  }
};

module.exports = statistics;
