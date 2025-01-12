import Menu from "../models/menuModel.js";

export const getAllMenuItem = async (req, res) => {
  try {
    const menuItem = await Menu.find();
    res.status(200).json(menuItem);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch menu items." });
  }
};

export const addMenuItem = async (req, res) => {
  const { name, category, price, availability } = req.body;
  try {
    if (!name || !category) {
      return res
        .status(400)
        .json({ message: "name and category field are required" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res
        .status(400)
        .json({ message: "Price is required and must be a positive number." });
    }

    const newMenuItem = new Menu({ name, category, price, availability });
    await newMenuItem.save();

    res.status(201).json({
      message: "Menu item added successfully.",
      menuItem: newMenuItem,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to add menu item." });
    console.log(`error in the addMenuItem function: ${error}`);
  }
};

export const updateMenuItem = async (req, res) => {
  const { id } = req.params;
  const { price, availability } = req.body;

  const updates = {};

  if (price !== undefined) {
    updates.price = price;
  }
  if (availability !== undefined) {
    updates.availability = availability;
  }

  try {
    const updatedMenuItem = await Menu.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }

    res.status(200).json({
      message: "Menu item updated successfully.",
      menuItem: updatedMenuItem,
    });
  } catch (error) {
    res.status(400).json({ message: "Failed to update menu item." });
    console.log(`error in the updateMenuItem function ${error}`);
  }
};

export const deleteMenuItem = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedMenuItem = await Menu.findByIdAndDelete(id);
    if (!deletedMenuItem) {
      return res.status(404).json({ message: "Menu item not found." });
    }
    res.status(200).json({ message: "Menu item deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete menu item." });
    console.log(`error in the deleteMenuItem controller: ${error}`);
  }
};
