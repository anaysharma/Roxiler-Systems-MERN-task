const getPiechartData = require('../utils/getPiechartData');

const piechart = async (req, res) => {
  const { month } = req.query;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const data = await getPiechartData(month);

    return res.status(200).json({
      message: 'transaction retreival successfull',
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = piechart;
