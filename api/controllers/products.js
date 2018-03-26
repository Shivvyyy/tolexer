const mongoose = require("mongoose");
const Product = require("../models/product");

exports.products_get_all = (req, res, next) => {
  Product.find()
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs.map(doc => {
          return {
            fullProduct: doc,
            request: {
              type: "GET",
              url: "http://tolexor.herokuapp.com/products/" + doc._id
            }
          };
        })
      };
      //   if (docs.length >= 0) {
      res.status(200).json(response);
      //   } else {
      //       res.status(404).json({
      //           message: 'No entries found'
      //       });
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_create_product = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    price: req.body.price,
    productImage: req.files,
    productSpecifications: req.body.productSpecifications,
    mainCategory: req.body.mainCategory,
    subCategory: req.body.subCategory,
    onSale: req.body.onSale,
    featured: req.body.featured,
    bestSeller: req.body.bestSeller,
    hotDeals: req.body.hotDeals
  });
  product
    .save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: "Created product successfully",
        createdProduct: {
          name: result.name,
          price: result.price,
          _id: result._id,
          request: {
            type: "GET",
            url: "http://localhost:3000/products/" + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_get_product = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .sort({ time: -1 })
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          product: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/products"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.products_update_product = (req, res, next) => {
  const id = req.params.productId;
  console.log(req.body);
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product updated",
        request: {
          type: "GET",
          url: "http://localhost:3000/products/" + id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_delete = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "Product deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/products",
          body: { name: "String", price: "Number" }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.products_get_byCategory = (req, res, next) => {
  Product
  .find({mainCategory: req.params.mainCategory })
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

exports.products_get_bySubCategory = (req, res, next) => {
  Product
  .find({subCategory: req.params.subCategory })
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.products_get_onSale = (req, res, next) => {
  Product
  .find({onSale: true })
    .limit(parseInt(req.params.limit))
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};



exports.products_get_featured = (req, res, next) => {
  Product
  .find({featured: true })
    .limit(parseInt(req.params.limit))
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};


exports.products_get_bestSeller = (req, res, next) => {
  Product
  .find({bestSeller: true })
    .limit(parseInt(req.params.limit))
    .sort({ time: -1 })
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};





exports.products_get_hotDeals = (req, res, next) => {
  Product
  .find({hotDeals: true })
      .limit(parseInt(req.params.limit))
  .sort({ time: -1 })
    .exec()

    .then(docs => {
      const response = {
        count: docs.length,
        products: docs
      };
      res.status(200).json(response);

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
