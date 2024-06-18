const product = require('../models/product');

const transactions = async (req, res) => {
  try {
    const { search, page, per_page } = req.query;
    const products = await product.find({});

    const query = search ? search.trim().toLowerCase() : '';
    const pageNumber = page ? Math.max(page - 1, 0) : 0;
    const range = per_page ? Math.max(per_page, 1) : 10;

    const filterRule = (prod) => {
      const title = prod.title.toLowerCase();
      const description = prod.description.toLowerCase();
      const category = prod.category.toLowerCase();

      return (
        title.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    };

    const filteredProducts = products.filter(filterRule);

    const data = filteredProducts.slice(
      pageNumber * range,
      pageNumber * range + range
    );

    return res.status(200).json({
      message: 'reading transactions successfull',
      data: {
        products: data,
        page: pageNumber + 1,
        perPage: range,
        total: data.length,
      },
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: 'error while getting transactions' });
  }
};

module.exports = transactions;
