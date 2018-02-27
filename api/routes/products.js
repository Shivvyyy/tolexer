const express = require("express");
const router = express.Router();
const multer = require('multer');

// const checkAuth = require('../middleware/check-auth');
const ProductsController = require('../controllers/products');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: maxSize
  },
  fileFilter: fileFilter
});

router.get("/", ProductsController.products_get_all);

router.post("/", upload.any('productImage'), ProductsController.products_create_product);

router.get("/:productId", ProductsController.products_get_product);

router.patch("/:productId", ProductsController.products_update_product);

router.delete("/:productId", ProductsController.products_delete);

module.exports = router;
