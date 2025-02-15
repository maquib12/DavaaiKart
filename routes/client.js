import express from "express";
import multer from "multer";
import {
    getProducts,
    getProductById,
    getCustomers,
    getTransactions,
    getGeography,
    deleteProduct,
    updateProduct,
    addProduct,
  } from "../controllers/client.js";

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Path to save images
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
  limits: {
    fields: 15, // Max number of non-file fields
    fileSize: 5 * 1024 * 1024, // Max file size (5 MB)
    files: 10, // Max number of files
  },
});

router.get("/products", getProducts);
router.get("/product/:id", getProductById);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

//delete Products
router.delete("/products/:id", deleteProduct);


router.put("/product/:id", updateProduct);

router.post(
  "/addProduct",
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  addProduct
);

export default router;