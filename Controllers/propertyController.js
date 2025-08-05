import Property from "../models/propertyModel.js";

//Create a new property
export const createProperty = async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res
      .status(201)
      .json({ message: "Property created successfully", data: property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating property", error: error.message });
  }
};

//Get all properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res
      .status(200)
      .json({ message: "Properties fetched successfully", data: properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};

//update a property
export const updateProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const { name, price, size, rooms, image, descriptions, location } =
      req.body;
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { name, price, size, rooms, image, descriptions, location },
      { new: true }
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res
      .status(200)
      .json({ message: "Property updated successfully", data: property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating property", error: error.message });
  }
};

//Delete a property
export const deleteProperty = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findByIdAndDelete(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res
      .status(200)
      .json({ message: "Property deleted successfully", data: property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting property", error: error.message });
  }
};

//Get a single property by ID
export const getPropertyById = async (req, res) => {
  try {
    const propertyId = req.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {    
      return res.status(404).json({ message: "Property not found" });
    }       
    res
      .status(200)
      .json({ message: "Property fetched successfully", data: property });
    } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching property", error: error.message });
    }
}
//Get properties by location
export const getPropertiesByLocation = async (req, res) => {
  try {
    const location = req.params.location;
    const properties = await Property.find({ location });
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res
      .status(200)
      .json({ message: "Properties fetched successfully", data: properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};
//Get properties by price range
export const getPropertiesByPriceRange = async (req, res) => {
  try {
    const { minPrice, maxPrice } = req.params;
    const properties = await Property.find({
      price: { $gte: minPrice, $lte: maxPrice },
    });
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res
      .status(200)
      .json({ message: "Properties fetched successfully", data: properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};
//Get properties by size range
export const getPropertiesBySizeRange = async (req, res) => {   
    try {
        const { minSize, maxSize } = req.params;
        const properties = await Property.find({
        size: { $gte: minSize, $lte: maxSize },
        });
        if (!properties || properties.length === 0) {
        return res.status(404).json({ message: "No properties found" });
        }
        res
        .status(200)
        .json({ message: "Properties fetched successfully", data: properties });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error fetching properties", error: error.message });
    }
};
//Get properties by number of rooms
export const getPropertiesByRooms = async (req, res) => {
    try {
        const rooms = req.params.rooms;
        const properties = await Property.find({ rooms });
        if (!properties || properties.length === 0) {
        return res.status(404).json({ message: "No properties found" });
        }
        res
        .status(200)
        .json({ message: "Properties fetched successfully", data: properties });
    } catch (error) {
        res
        .status(500)
        .json({ message: "Error fetching properties", error: error.message });
    }
};
//Get properties by name
export const getPropertiesByName = async (req, res) => {
  try {
    const name = req.params.name;
    const properties = await Property.find({ name: new RegExp(name, "i") });
    if (!properties || properties.length === 0) {
      return res.status(404).json({ message: "No properties found" });
    }
    res
      .status(200)
      .json({ message: "Properties fetched successfully", data: properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching properties", error: error.message });
  }
};




