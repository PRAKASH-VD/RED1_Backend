import express from "express";
import {addToCart,removeFromCart,updateCartQuantity,viewCart} from "../Controllers/cartController.js";



const router = express.Router();
router.post("/add",authMiddleware, addToCart);
router.delete("/remove/:propertyId", authMiddleware, removeFromCart);
router.put("/update/:propertyId", authMiddleware, updateCartQuantity);
router.get("/view", authMiddleware, viewCart);




export default router;