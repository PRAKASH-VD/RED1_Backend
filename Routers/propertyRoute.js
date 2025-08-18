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
import { roleMiddleware } from "../Middlewares/roleMiddleware.js";

const router = express.Router();

// Create property (admin or agent)
router.post("/create", roleMiddleware(["admin", "agent"]), createProperty);
// router.post("/create", adminMiddleware, createProperty);
router.get("/getproperties", getAllProperties);
// Update property (admin or agent)
router.put("/update/:id", roleMiddleware(["admin", "agent"]), updateProperty);
// Delete property (admin only)
router.delete("/delete/:id", roleMiddleware(["admin"]), deleteProperty);
router.get("/byid/:id", getPropertyById);
router.get("/bylocation/:location", getPropertiesByLocation);
router.get("/byprice/:minPrice/:maxPrice", getPropertiesByPriceRange);
// router.get("/byprice/:price", getPropertiesByPriceRange);
router.get("/byrooms/:rooms", getPropertiesByRooms);
router.get("/size/:minSize/:maxSize", getPropertiesBySizeRange);
// router.get("/size/:minsize/:maxsize", getPropertiesBySizeRange);
router.get("/byname/:name", getPropertiesByName);


// 🔍 Advanced search with filters + pagination + sorting
router.get("/search", async (req, res) => {
  try {
    const {
      q,
      location,
      type,
      minPrice,
      maxPrice,
      minRooms,
      maxRooms,
      page = 1,
      limit = 12,
      sort = "-createdAt",
    } = req.query;

    const filter = {};

    if (q) filter.name = new RegExp(q, "i");
    if (location) filter.location = location;
    if (type) filter.type = type;

    if (minPrice || maxPrice) {
      filter.price = {
        ...(minPrice && { $gte: +minPrice }),
        ...(maxPrice && { $lte: +maxPrice }),
      };
    }

    if (minRooms || maxRooms) {
      filter.rooms = {
        ...(minRooms && { $gte: +minRooms }),
        ...(maxRooms && { $lte: +maxRooms }),
      };
    }

    const data = await Property.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(+limit);

    const total = await Property.countDocuments(filter);

    res.status(200).json({
      message: "Properties fetched successfully",
      data,
      page: +page,
      total,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching properties",
      error: error.message,
    });
  }
});

export default router;
