const Products = require('../models/productModel');

async function productfiltering(req, res) {
  const { category, price, brand } = req.query;
  if (brand === 'all' && Number(price) !== 500000 && category == 'all') {
    const tquery = {
      price: {
        $lte: Number(price),
      },
    };
    const fproducts = await Products.find(tquery).sort({ price: -1 });
    res.status(200).json(fproducts);
  } else if (brand != 'all' && Number(price) == 500000 && category == 'all') {
    const tquery = {
      brand: { $regex: brand, $options: 'i' },
    };
    const fproducts = await Products.find(tquery);
    res.status(200).json(fproducts);
  } else if (category != 'all' && brand == 'all' && Number(price) == 500000) {
    const fproducts = await Products.find({
      category: { $regex: category, $options: 'i' },
    });
    res.status(200).json(fproducts);
  } else if (brand != 'all' && Number(price) != 500000 && category == 'all') {
    const tquery = {
      $and: [
        {
          price: {
            $lte: Number(price),
          },
        },
        {
          brand: { $regex: brand, $options: 'i' },
        },
      ],
    };
    const fproducts = await Products.find(tquery);
    res.status(200).json(fproducts);
  } else if (brand != 'all' && category != 'all' && Number(price) == 500000) {
    const tquery = {
      $and: [
        { category: { $regex: category, $options: 'i' } },
        {
          brand: { $regex: brand, $options: 'i' },
        },
      ],
    };
    const fproducts = await Products.find(tquery);
    res.status(200).json(fproducts);
  } else if (brand == 'all' && Number(price) != 500000 && category != 'all') {
    const tquery = {
      $and: [
        {
          price: {
            $lte: Number(price),
          },
        },
        {
          category: { $regex: category, $options: 'i' },
        },
      ],
    };
    const fproducts = await Products.find(tquery);
    res.status(200).json(fproducts);
  } else if (brand == '' && category == '' && price == '') {
    res.status(200).json(products);
  } else if (brand != 'all' && category != 'all' && Number(price) != 500000) {
    const tquery = {
      $and: [
        {
          price: {
            $lte: Number(price),
          },
        },
        {
          category: { $regex: category, $options: 'i' },
        },
        {
          brand: { $regex: brand, $options: 'i' },
        },
      ],
    };
    const fproducts = await Products.find(tquery);
    res.status(200).json(fproducts);
  } else {
    const products = await Products.find();
    res.status(200).json(products);
  }
}

module.exports = productfiltering;
