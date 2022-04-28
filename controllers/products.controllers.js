const { Product } = require("../model/product.model");
const { User } = require("../model/user.model");

const { catchAsync } = require("../utils/catchAsync");
const { filterObj } = require("../utils/filterObj");

const { storage } = require("../database/firebase");

const { ref, uploadBytes, getDownloadURL } = require("firebase/storage");

// Create a new product
exports.createProduct = catchAsync(async (req, res, next) => {
  const { title, description, quantity, price } = req.body;

  const imgRef = ref(
    storage,
    `products-imgs/${new Date()}/${Date.now()}-${req.file.originalname}`
  );

  const result = await uploadBytes(imgRef, req.file.buffer);

  const newProduct = await Product.create({
    title,
    description,
    img: result.metadata.fullPath,
    quantity,
    price,
    userId: req.currentUser.id
  });

  res.status(201).json({
    status: "success",
    data: {
      newProduct
    }
  });
});

// Get all the products avalable
exports.getAllProducts = catchAsync(async (req, res, next) => {
  const products = await Product.findAll({
    where: { status: "active" },
    include: [{ model: User, attributes: { exclude: ["password"] } }]
  });

  const productsPromises = products.map(
    async ({
      id,
      title,
      description,
      img,
      quantity,
      price,
      createdAt,
      updatedAt,
      user
    }) => {
      const imgRef = ref(storage, img);

      const imgDownloadUrl = await getDownloadURL(imgRef);

      return {
        id,
        title,
        description,
        img: imgDownloadUrl,
        quantity,
        price,
        createdAt,
        updatedAt,
        user
      };
    }
  );

  const resolvedProducts = await Promise.all(productsPromises);

  res.status(201).json({
    status: "success",
    data: {
      products: resolvedProducts
    }
  });
});

// Get all product by id
exports.getProductById = catchAsync(async (req, res, next) => {
  const { product } = req;

  const imgRef = ref(storage, product.img);

  const imgDownloadUrl = await getDownloadURL(imgRef);

  product.img = imgDownloadUrl;

  res.status(201).json({
    status: "success",
    data: {
      product
    }
  });
});

// Update the product
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  const data = filterObj(req.body, "title", "description", "quantity", "price");

  const productUpdated = await product.update({ ...data });

  res.status(200).json({
    status: "success",
    data: {
      productUpdated
    }
  });
});

// Delete the product
exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { product } = req;

  await product.update({ status: "deleted" });

  res.status(204).json({
    status: "success"
  });
});
