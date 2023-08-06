const Products = require('../models/productModel');

async function searchFiltering(query, res) {
  if (!query || query.name == '') {
    res.status(200).json({});
  } else {
    const searchString = query.name; // Replace with the search term
    const searchWords = searchString.split(' ');
    const regexQueries = searchWords.map((word) => ({
      $or: [
        { name: { $regex: word, $options: 'i' } },
        { brand: { $regex: word, $options: 'i' } },
        { category: { $regex: word, $options: 'i' } },
      ],
    }));

    const dbquery = {
      $or: regexQueries,
    };
    const product = await Products.find(dbquery).limit(5);
    if (product.length == 0) {
      res.status(200).json({ message: 'No products found' });
    } else {
      res.status(200).json(product);
    }
  }
}
module.exports = searchFiltering;
