import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { PiBowlFoodDuotone } from "react-icons/pi";
import { FaOpencart } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import { useEffect } from "react";

const HomeMenuItem = () => {
  const [menuItems, setMenuItems] = useState([]);

  const gettingMenuItem = async () => {
    const response = await axiosInstance.get("/menu/menu-item");
    setMenuItems(response.data);
    try {
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  useEffect(() => {
    gettingMenuItem();
  }, []);

  const Availability = (props) => {
    return (
      <div
        variant="body2"
        className={`font-semibold ${
          props.availability === true ? "text-green-600" : "text-red-500"
        }`}
      >
        {props.availability === true ? "Available" : "Not Available"}
      </div>
    );
  };
  return (
    <div className="w-full mx-2 p-4 sm:mx-6 sm:p-6 lg:mx-8 lg:p-8 h-full rounded-xl mb-4 shadow-xl">
      <div>
        <div className="flex flex-wrap items-center justify-between">
          <h1 className="font-sans font-extrabold text-lg sm:text-xl lg:text-2xl">
            Find Your Next Favorite Dish
          </h1>
        </div>

        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {menuItems.length > 0
            ? menuItems.map((foodItem, i) => (
                <Card
                  sx={{ maxWidth: 345 }}
                  elevation={7}
                  key={i}
                  className="mx-auto w-full"
                >
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      className="flex items-center justify-start gap-2"
                    >
                      <div>
                        <PiBowlFoodDuotone size={25} />
                      </div>
                      {foodItem.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                      className="flex flex-col gap-10"
                    >
                      <Typography
                        variant="body2"
                        sx={{ mb: "15px" }}
                        className="text-gray-500 capitalize flex items-center gap-2"
                      >
                        ₹{foodItem.price} • {foodItem.category} •
                        {<Availability availability={foodItem.availability} />}
                      </Typography>
                    </Typography>
                    <div className="flex items-center justify-between">
                      <Rating
                        size="medium"
                        value={Math.floor(Math.random() * (5 - 2 + 1)) + 2}
                      />

                      <Button
                        color="secondary"
                        variant="contained"
                        size="small"
                        endIcon={<FaOpencart />}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default HomeMenuItem;
