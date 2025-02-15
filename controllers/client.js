import Product from "../models/Product.js";
import ProductStat from "../models/ProductStat.js";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import getCountryIso3 from "country-iso-2-to-3";


export const getProducts = async (req, res) => {
    try {
      const products = await Product.find();
  
      const productsWithStats = await Promise.all(
        products.map(async (product) => {
          const stat = await ProductStat.find({
            productId: product._id,
          });
          return {
            ...product._doc,
            stat,
          };
        })
      );
  
      res.status(200).json(productsWithStats);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};

export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getCustomers = async (req, res) => {
    try {
      const customers = await User.find({ role: "user" }).select("-password");
      res.status(200).json(customers);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const getTransactions = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
  
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const transactions = await Transaction.find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
  
      const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        transactions,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };
  
  export const getGeography = async (req, res) => {
    try {
      const users = await User.find();
  
      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});
  
      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );
  
      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };


  export const deleteProduct = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Find and delete the product
      const deletedProduct = await Product.findByIdAndDelete(id);
  
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete product", error: error.message });
    }
  };

  
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const productData = req.body;

    // Find and update the product
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validations
    });

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product: updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update product", error: error.message });
  }
};

export const addProduct = async (req, res) => {
  try {
    const { body, files } = req;
    const newProduct = new Product({
      name: body.name,
      composition: body.composition,
      manufacturer: body.manufacturer,
      consumeType: body.consumeType,
      returnPolicy: body.returnPolicy,
      expires: body.expires,
      price: body.price,
      numberOfProducts: body.numberOfProducts,
      packetSize: body.packetSize,
      description: body.description,
      category: body.category,
      rating: body.rating,
      supply: body.supply,
      image: files?.image?.[0]?.path, // Main image path
      images: files?.images?.map((file) => file.path), // Array of additional images
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add product.",
      error: error.message,
    });
  }
};
