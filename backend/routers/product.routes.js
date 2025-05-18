import express from "express";
import multer from "multer";
import {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    searchProducts // Add this import
} from "../controllers/product.controller.js";
import fs from 'fs';

const uploadsDir = './uploads';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
}

const router = express.Router();

// Set up multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Directory for uploaded files
    },
    filename: (req, file, cb) => {
        const timestamp = Date.now(); // Use only the timestamp for uniqueness
        const cleanFileName = file.originalname.replace(/\s+/g, '_'); // Replace spaces with underscores for compatibility
        cb(null, `${timestamp}-${cleanFileName}`);
    },
});

const upload = multer({ storage });

// Serve static files from the uploads folder
router.use("/uploads", express.static("uploads"));

// Define the search route (place it before the /:id route to avoid conflicts)
router.get("/search", searchProducts);

// Define other product-related routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.post("/", upload.single("image"), createProduct);
router.put("/:id", upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

export default router;
