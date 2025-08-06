import Booking from "../Models/bookingModel.js";
import Cart from "../Models/cartModel.js";
import sendEmail from "../Utils/mailer.js";

export const placeBooking = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.property"
    );

    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty or not found" });
    }
    const totalPrice = cart.items.reduce(
      (acc, item) => acc + item.property.price * item.quantity,
      0
    );
    const booking = new Booking({
      user: req.user._id,
      properties: cart.items,
      totalPrice,
      status: "Pending",
    });
    await booking.save();
    // Clear the cart after booking
    if (cart) {
      await Cart.findOneAndDelete({ user: req.user._id });
    }

    // await Cart.updateOne({ user: req.user._id }, { $set: { products: [] } });

    // Send confirmation email

    try {
      const emailContent = `
      <h1>Booking Confirmation</h1>
      <p>Thank you for your booking. Your total amount is ${totalPrice}.</p>
      <p>Booking ID: ${booking._id}</p>
    `;
      const userMail = req.user.email;
      await sendEmail(userMail, "Booking Confirmation", emailContent);
    } catch (error) {
      console.error("Email Sending Failed:", error.message);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get My Bookings
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id }).populate(
      "properties.property"
    );
    res
      .status(200)
      .json({ message: "Bookings fetched successfully", data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Get All Bookings - Admin & Agent
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate("properties.property");
    res
      .status(200)
      .json({ message: "All bookings fetched successfully", data: bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Update Booking Status - Admin & Agent
export const updateBookingStatus = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    const updateBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true }
    );
    if (!updateBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking status updated successfully",
      data: updateBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//Delete Booking - Admin
export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const deletedBooking = await Booking.findByIdAndDelete(bookingId);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({
      message: "Booking deleted successfully",
      data: deletedBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
