const getBarchartData = require('../utils/getBarchartData');

const barchart = async (req, res) => {
  const { month } = req.query;

  if (!month || isNaN(month) || month < 1 || month > 12) {
    return res.status(400).json({ error: 'Invalid month parameter' });
  }

  try {
    const data = await getBarchartData(month);

    return res.status(200).json({
      message: 'successfully grouped trnansactions',
      data,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = barchart;
