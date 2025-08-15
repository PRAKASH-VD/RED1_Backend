import Cart from "../Models/cartModel.js";
import Property from "../Models/propertyModel.js";

//add to cart

export const addToCart = async (req, res) => {
  try {
    const { propertyId, quantity } = req.body;
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
        totalPrice: 0,
      });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.property.toString() === propertyId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ property: propertyId, quantity: quantity });
    }
    cart.totalPrice += property.price * quantity;
    await cart.save();
    res.status(200).json({ message: "Item Added to cart", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// view cart

export const viewCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "items.property"
    );

    if (!cart) {
      return res
        .status(200)
        .json({ message: "Cart is empty", data: { items: [] } });
    }
    res.status(200).json({ message: "Cart retrieved", data: cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// remove from cart

export const removeFromCart = async (req, res) => {
  try {
    const { propertyId } = req.params;
    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const itemIndex = cart.items.findIndex(
      (item) => item.property.toString() === propertyId
    );
    if (itemIndex > -1) {
      const removeItem = cart.items.splice(itemIndex, 1)[0];
      cart.totalPrice -=
        removeItem.quantity * (await Property.findById(propertyId)).price;
      await cart.save();
      res.status(200).json({ message: "Removed From Cart", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update quantity

export const updateCartQuantity = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const { change } = req.body; // +1 or -1

    let cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(item => item.property.toString() === propertyId);
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += change;
      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      }
      cart.totalPrice += change * (await Property.findById(propertyId)).price;
      await cart.save();
      res.status(200).json({ message: "Cart updated", cart });
    } else {
      res.status(404).json({ message: "Item not found in cart" });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};