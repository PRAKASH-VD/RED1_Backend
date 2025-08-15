import express from "express";
import {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
  getPropertiesByLocation,
  getPropertiesByPriceRange,
  getPropertiesByRooms,
  getPropertiesBySizeRange,
  getPropertiesByName,
} from "../Controllers/propertyController.js";
import { agentMiddleware } from "../Middlewares/agentMiddleware.js";
import { adminMiddleware } from "../Middlewares/adminMiddleware.js";

const router = express.Router();
router.post("/create",agentMiddleware, createProperty);
router.get("/getproperties", getAllProperties);
router.put("/update/:id",adminMiddleware, updateProperty);
router.delete("/delete/:id",adminMiddleware, deleteProperty);
router.get("/byid/:id", getPropertyById);
router.get("/bylocation/:location", getPropertiesByLocation);
router.get("/byprice/:minPrice/:maxPrice", getPropertiesByPriceRange);
// router.get("/byprice/:price", getPropertiesByPriceRange);
router.get("/byrooms/:rooms", getPropertiesByRooms);
router.get("/size/:minSize/:maxSize", getPropertiesBySizeRange);
// router.get("/size/:minsize/:maxsize", getPropertiesBySizeRange);
router.get("/byname/:name", getPropertiesByName);

export default router;
