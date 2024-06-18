const product = require('../models/product');

const initialize = async (req, res) => {
  try {
    const response = await fetch(process.env.REMOTE_URL);

    if (!response.ok) throw new Error('Error in fetching data from remote URL');
    const data = await response.json();

    for (let i = 0; i < data.length; i++) await product.create(data[i]);

    return res
      .status(200)
      .json({ message: 'initialization successfull', data });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Error in initializing database' });
  }
};

module.exports = initialize;
