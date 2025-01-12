import Order from "../models/orderModel.js";

export const placeOrder = async (req, res) => {
  const { items } = req.body;
  try {
    const totalAmount = items.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    const newOrder = new Order({
      userId: req.user._id,
      items,
      totalAmount,
      status: "Pending",
    });

    await newOrder.save();
    res
      .status(201)
      .json({ message: "Order placed successfully.", order: newOrder });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to place order.", error: err.message });
    console.log(`error in the placeOrder function: ${error}`);
  }
};

export const getUserOrder = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).populate(
      "items.menuItemId"
    );
    res.status(200).json(orders);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch orders.", error: err.message });
  }
};
