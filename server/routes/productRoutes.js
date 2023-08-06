const productRoute = require('express').Router();
const multer = require('multer');
const { verifyAdmin, verifyToken } = require('../auth/verify');
const Offers = require('../models/offersModel');
const Products = require('../models/productModel');
const Users = require('../models/userModel');
const productfiltering = require('./productFiltering');
const searchFiltering = require('./searchFiltering');
const cloudinary = require('cloudinary').v2;
// creating products
const storage = multer.memoryStorage();
const upload = multer({ storage });

productRoute.get('/admin/products', verifyAdmin, async (req, res) => {
  try {
    // const query = req.query;
    // const products = await Products.find();
    // res.status(200).json(products);
    productfiltering(req, res);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

productRoute.post(
  '/createproducts',
  verifyAdmin,
  upload.array('img', 4),
  async (req, res) => {
    try {
      const {
        name,
        price,
        desc,
        stock,
        category,
        brand,
        feature,
        size,
        color,
        disc,
      } = req.body;
      const sizearray = size.split(',');
      const catarray = category.split(',');
      const colorarray = color.split(',');
      cloudinary.config({
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.API_KEY,
        api_secret: process.env.API_SECRET,
      });
      let images = [];
      for (const file of req.files) {
        const b64 = Buffer.from(file.buffer).toString('base64');
        let dataURI = 'data:' + file.mimetype + ';base64,' + b64;
        const date = new Date();
        const { url, public_id } = await cloudinary.uploader.upload(dataURI, {
          public_id: `${file.originalname.toString() + date.toString()}`,
          folder: 'helmart/products/',
        });
        if (url && public_id) {
          images.push({
            id: public_id,
            url,
          });
        } else {
          res.status(401).json({ message: 'Error occured while saving image' });
        }
      }
      const product = new Products({
        name,
        price,
        desc,
        disc,
        size: sizearray,
        color: colorarray,
        stock,
        category: catarray,
        img: images,
        brand,
        feature,
      });
      await product.save();
      if (!product) {
        res.status(401).json({ message: 'Please fill the requires fields' });
      } else {
        res.status(200).json({ product });
      }
    } catch (error) {
      console.log(error);
      res.status(400).json(error.message);
    }
  }
);

productRoute.put('/update/:_id', verifyAdmin, async (req, res) => {
  try {
    const { _id } = req.params;
    const {
      name,
      price,
      desc,
      stock,
      category,
      brand,
      feature,
      size,
      color,
      disc,
    } = req.body;
    // const sizearray = size.split(',');
    // const catarray = category.split(',');
    // const colorarray = color.split(',');
    const product = await Products.findByIdAndUpdate(
      _id,
      {
        name,
        price,
        desc,
        stock,
        category,
        brand,
        feature,
        size,
        color,
        disc,
      },
      {
        new: true,
      }
    );
    if (!product) {
      res.status(400).json({ message: 'NO product found' });
    } else {
      res.status(201).json({ message: 'Product Updated' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//delete product
productRoute.delete('/delete/:_id', verifyAdmin, async (req, res) => {
  const { _id } = req.params;
  try {
    const product = await Products.findByIdAndDelete({ _id });
    if (product) {
      let resu = false;
      for (const ele of product.img) {
        const { result } = await cloudinary.uploader.destroy(ele.id);
        if (result == 'ok' || result == 'not found') {
          resu = true;
        }
      }
      if (resu) {
        res.status(200).json({ message: 'Product deleted suceesffully' });
      } else {
        res.status(400).json({ message: 'Error occured. Please try again.' });
      }
    } else {
      res.status(200).json({ message: 'Invalid product id' });
    }
  } catch (error) {
    res.status(400).json({ messsage: error.message });
  }
});

//create image for slideshow
productRoute.post('/slideshow', async (req, res) => {
  try {
    const { url } = req.body;
    const image = new Offers({ url });
    await image.save();
    res.status(200).json({ image });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//crousel pictures slideshow pictures
productRoute.get('/slideshow', async (req, res) => {
  try {
    const images = await Offers.find();
    res.status(200).json({ images });
  } catch (error) {
    res.status(400).json(error.message);
  }
});

//get all products
productRoute.get('/products', async (req, res) => {
  try {
    //const products = await Products.find();
    await productfiltering(req, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

productRoute.get('/searchproducts', async (req, res) => {
  try {
    const query = req.query;
    searchFiltering(query, res);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get single product and related product
productRoute.get('/product/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Products.findById(id);
    if (!product) {
      res.status(201).json({ message: 'Product Not Found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

productRoute.get('/relatedproduct/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (!product) {
      res.status(201).json({ message: 'Product Not Found' });
    }
    const relatedprod = await Products.find({
      $or: [{ brand: product.brand }, { category: product.category }],
    }).limit(5);
    const fil = relatedprod.filter(
      (x) => x._id.toString() != product._id.toString()
    );
    res.status(200).json(fil);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get Top products
productRoute.get('/topproducts', async (req, res) => {
  try {
    const products = await Products.find({ feature: 'top' }).limit(6);
    products.sort(function (a, b) {
      let date1 = new Date(a.createdDate);
      let date2 = new Date(b.createdDate);
      return date2 - date1;
    });
    if (!products) {
      res.status(201).json({ message: 'No product added' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//get trending products
productRoute.get('/trendingproducts', async (req, res) => {
  try {
    const products = await Products.find({ feature: 'trending' }).limit(6);
    products.sort(function (a, b) {
      let date1 = new Date(a.createdDate);
      let date2 = new Date(b.createdDate);
      return date2 - date1;
    });
    if (!products) {
      res.status(201).json({ message: 'No product added' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

productRoute.get('/newproducts', async (req, res) => {
  try {
    const products = await Products.find({ feature: 'newarrival' }).limit(6);
    products.sort(function (a, b) {
      let date1 = new Date(a.createdDate);
      let date2 = new Date(b.createdDate);
      return date2 - date1;
    });
    if (!products) {
      res.status(201).json({ message: 'No product added' });
    } else {
      res.status(200).json(products);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
productRoute.get('/getbrand', async (req, res) => {
  try {
    const product = await Products.find();
    let brand = [];
    if (product) {
      for (const ele of product) {
        if (brand.includes(ele.brand.toUpperCase())) {
        } else {
          brand.push(ele.brand.toUpperCase());
        }
      }
      res.status(200).json(brand);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
//adding review
productRoute.post('/review/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { _id } = req.user;
    const { star, text } = req.body;
    let stars = Math.round(star);
    const user = await Users.findById(_id);
    if (user) {
      const review = {
        id: user._id,
        name: user.name,
        img: user.avatar.url,
        star: stars,
        text,
      };
      if (!star || !text) {
        res.status(200).json({ message: 'Please fill the fields properly' });
      } else {
        const product = await Products.findById(id);
        if (product) {
          let l = product.reviews.length;
          if (product.reviews.length == 0) {
            product.reviews.push(review);
            product.rating = stars;
          } else {
            product.reviews.map((x) => {
              if (x.id.toString() == user._id.toString()) {
                (x.star = stars),
                  (x.text = text),
                  l == 1
                    ? (product.rating = Math.round(star))
                    : (product.rating = Math.round(
                        (product.rating + stars) / l
                      ));
              } else {
                product.reviews.push(review);
                l == 1
                  ? (product.rating = stars)
                  : Math.round((product.rating = (product.rating + stars) / l));
              }
            });
          }
          await product.save();
          res.status(200).json({ message: 'Product reviewed successfully' });
        } else {
          res.status(400).json({ messasge: 'Product not found' });
        }
      }
    } else {
      res.status(400).json({ messasge: 'Please login' });
    }
  } catch (error) {
    res.status(400).json({ messasge: error.message });
  }
});

module.exports = productRoute;
