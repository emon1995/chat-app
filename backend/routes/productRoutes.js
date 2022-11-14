const express = require("express");
const router = require("express").Router();
const multer = require("multer");
const asyncHandler = require("express-async-handler");
const Products = require("../models/productModel");
const app = express();

// Storage file
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    // /Web Development/final source/hindi chat/chat-app/frontend/public/images
    callback(
      null,
      "/Web Development/final source/hindi chat/chat-app/frontend/public/images"
    );
  },
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

// upload file
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1000000, // 1MB
  },
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(new Error("Only .jpg, .png or .jpeg format allowed!"));
    }
  },
});

// REQUEST GET ALL PRODUCTS
router.get("/buy", (req, res) => {
  Products.find()
    .sort({ postDate: -1 })
    .then((product) => {
      res.json(product);
      // res.send(product);
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// REQUEST GET ALL PRODUCTS
router.get("/sell/:id", async (req, res, next) => {
  try {
    const products = await Products.find({ users: req.params.id })
      .select([
        "title",
        "product",
        "price",
        "_id",
        "productImage",
        "users",
        "sender",
        "postDate",
        "updatedAt",
        "userImage",
      ])
      .sort({ postDate: -1 });
    return res.json(products);
  } catch (ex) {
    next(ex);
  }
});

// Add products
router.post(
  "/add",
  asyncHandler(async (req, res) => {
    const {
      title,
      product,
      price,
      productImage,
      users,
      sender,
      username,
      userImage,
    } = req.body;

    if (!title || !price || !product) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    const products = await Products.create({
      title,
      price,
      product,
      productImage,
      users,
      sender,
      username,
      userImage,
    });

    if (products) {
      res.status(201).json({
        title: products.title,
        price: products.price,
        product: products.product,
        productImage: products.productImage,
        users: products.users,
        sender: products.users,
        username: products.username,
        userImage: products.userImage,
      });
    } else {
      res.status(400);
      throw new Error("Failed to Create the User");
    }
  })
);

// REQUEST ADD NEW PRODUCTS
// router.route("/add").post(upload.single("productImage"), (req, res, next) => {
//   if (!req.file.originalname) {
//     const error = new Error("Please choose files");
//     error.httpStatusCode = 400;
//     return next(error);
//   }

//   const newProduct = new Products({
//     title: req.body.title,
//     product: req.body.product,
//     price: req.body.price,
//     productImage: req.file.originalname,
//     users: req.body.users,
//     sender: req.body.users,
//     username: req.body.username,
//     userImage: req.body.userImage,
//   });

//   newProduct
//     .save()
//     .then(() => res.json("New Product posted!"))
//     .catch((err) => res.status(400).json(`Error ${err}`));
// });

// REQUEST FIND PRODUCT BY ID
router.get("/product/:id", (req, res) => {
  Products.findById(req.params.id)
    .then((product) => res.json(product))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// Edit
router.put(
  "/update/:id",
  asyncHandler(async (req, res) => {
    const { title, product, price, productImage } = req.body;

    if (!title || !price || !product) {
      res.status(400);
      throw new Error("Please Enter all the Feilds");
    }

    await Products.findById(req.params.id).then((products) => {
      products.title = title;
      products.product = product;
      products.price = price;
      products.productImage = productImage;

      products
        .save()
        .then(() => res.json("Product UPDATED!!!"))
        .catch((err) => {
          res.status(400);
          throw new Error("Failed to Create the User");
        });
    });
  })
);

// REQUEST FIND PRODUCT BY ID AND UPDATE
// router.put("/update/:id", upload.single("productImage"), (req, res, next) => {
//   if (!req.file.originalname) {
//     const error = new Error("Please choose files");
//     error.httpStatusCode = 400;
//     return next(error);
//   }

//   Products.findById(req.params.id).then((product) => {
//     product.title = req.body.title;
//     product.product = req.body.product;
//     product.price = req.body.price;
//     product.productImage = req.file.originalname;
//     // product.users = req.body.users;
//     // product.sender = req.body.users;
//     product
//       .save()
//       .then(() => res.json("Product UPDATED!!!"))
//       .catch((err) => res.status(400).json(`Error ${err}`));
//   });
// });

// REQUEST FIND PRODUCT BY ID AND DELETE
router.delete("/delete/:id", (req, res) => {
  Products.findByIdAndDelete(req.params.id)
    .then(() => res.json("The product is DELETED!!"))
    .catch((err) => res.status(400).json(`Error ${err}`));
});

// multer error
app.use((err, req, res, next) => {
  if (err) {
    if (err instanceof multer.MulterError) {
      res.status(500).send("There was an upload error!");
    } else {
      res.status(500).send(err.message);
    }
  } else {
    res.send("success");
  }
});

module.exports = router;
