import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import { AiOutlinePlus, AiOutlineEdit } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { PiBowlFoodDuotone } from "react-icons/pi";
import Rating from "@mui/material/Rating";
import { FaTrash } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { axiosInstance } from "../lib/axios.js";
import DrawerComponent from "../components/DrawerComponent";
import Drawer from "@mui/material/Drawer";
import UpdateMenuItem from "../components/UpdateMenuItem.jsx";
import toast from "react-hot-toast";

const ModifyItem = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [updateOpenDrawer, setUpdateOpenDrawer] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const toggleDrawer = (newOpen) => () => {
    setOpenDrawer(newOpen);
  };

  const handleUpdateClick = (item) => {
    setSelectedItem(item);
    setUpdateOpenDrawer(true);
  };

  const [menuItems, setMenuItems] = useState([
    {
      id: 1,
      name: "Spaghetti Bolognese",
      price: 500,
      category: "Main Course",
      availability: "Not Available",
      rating: 2,
    },
    {
      id: 2,
      name: "Margherita Pizza",
      price: 400,
      category: "Main Course",
      availability: "Available",
      rating: 4,
    },
  ]);

  const getAllMenuItem = async () => {
    try {
      const response = await axiosInstance.get("/menu/menu-item");
      console.log(response.data);
      setMenuItems(response.data);
    } catch (error) {
      console.log(`error in the getAllMenuItem function: ${error}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await axiosInstance.delete(`/menu/delete-menu-item/${id}`);

      toast.success("Menu Item deleted Successfully");
      getAllMenuItem();
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(`Error deleting item with ID ${id}:`, error);
    }
  };

  const Availability = (props) => {
    return (
      <div
        variant="body2"
        className={`font-semibold  ${
          props.availability === true ? "text-green-600" : "text-red-500"
        }`}
      >
        {props.availability === true ? "Available" : "Not Available"}
      </div>
    );
  };
  useEffect(() => {
    getAllMenuItem();
  }, []);

  return (
    <div className="flex h-screen mt-[100px]">
      {/* Sidebar */}
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 border-r hidden sm:block">
        {/* For small screens, hide "Menu Actions" text */}
        <div className="flex items-center mb-4">
          <h3 className="text-3xl font-extrabold text-black hidden sm:block">
            Menu Actions
          </h3>
          {/* Display menu icon for small screens */}
          <MdOutlineRestaurantMenu className="block sm:hidden text-3xl text-black" />
        </div>
        <ul>
          <li className="mb-4">
            <Button
              variant="contained"
              color="success"
              startIcon={<MdOutlineRestaurantMenu />}
              className="w-full text-left capitalize text-gray-600 hover:text-black sm:text-sm md:text-base sm:p-1"
            >
              {/* For small screens, hide button text */}
              <span className="hidden sm:inline">View All Food Items</span>
            </Button>
          </li>
          <li className="mb-4">
            <Button
              startIcon={<AiOutlinePlus />}
              variant="contained"
              color="success"
              className="w-full text-left capitalize text-gray-600 hover:text-black sm:text-sm md:text-base sm:p-1"
              onClick={toggleDrawer(true)}
            >
              {/* For small screens, hide button text */}
              <span className="hidden sm:inline">Add New Food Item</span>
            </Button>
            <Drawer
              anchor="right"
              open={openDrawer}
              onClose={toggleDrawer(false)}
            >
              <DrawerComponent toggleDrawer={toggleDrawer} />
            </Drawer>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="w-3/4 p-6">
        <h1 className="mb-6 text-3xl text-black font-extrabold text-left">
          Find Your Next Favorite Dish
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item, i) => (
            <Card key={i} className="shadow-md border rounded-lg" elevation={7}>
              <CardContent>
                <Typography
                  variant="h6"
                  className="font-bold flex items-center gap-2 text-gray-800 mb-2"
                >
                  <div>
                    <PiBowlFoodDuotone className="size-7" />
                  </div>
                  {item.name}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: "15px" }}
                  className="text-gray-500 capitalize flex items-center gap-2"
                >
                  ₹{item.price} • {item.category} •
                  {<Availability availability={item.availability} />}
                </Typography>

                <div className="flex items-center justify-between">
                  <Rating
                    size="medium"
                    value={Math.floor(Math.random() * (5 - 2 + 1)) + 2}
                    disabled
                  />
                  <div>
                    <Tooltip title="Delete Item">
                      <IconButton
                        color="error"
                        onClick={() => handleDelete(item._id)}
                      >
                        <FaTrash />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Update Item">
                      <IconButton
                        color="secondary"
                        onClick={() => handleUpdateClick(item)}
                      >
                        <AiOutlineEdit />
                      </IconButton>
                    </Tooltip>
                    <Drawer
                      anchor="right"
                      open={updateOpenDrawer}
                      onClose={() => setUpdateOpenDrawer(false)}
                    >
                      <UpdateMenuItem
                        menuData={selectedItem}
                        onClose={() => setUpdateOpenDrawer(false)}
                      />
                    </Drawer>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModifyItem;
