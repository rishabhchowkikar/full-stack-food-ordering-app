import React, { useRef } from "react";
import AppetizersImg from "../assets/Appetizers.jpg";
import mainCourseImg from "../assets/main_course.jpg";
import dessertImg from "../assets/desserts.jpg";
import beverageImg from "../assets/beverages.jpg";
import saladImg from "../assets/salads.jpeg";
import snackImg from "../assets/sanacks.jpg";
import kidsImg from "../assets/kidsSpecial.jpg";
import chefImg from "../assets/chefSpecial.jpeg";
import { FaArrowLeft } from "react-icons/fa6";
import { FaArrowRight } from "react-icons/fa6";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const foodArray = [
  {
    itemName: "Appetizers",
    image: AppetizersImg,
    subtitle: "Start your meal with tasty bites.",
  },
  {
    itemName: "Main Course",
    image: mainCourseImg,
    subtitle: "Hearty and filling dishes to satisfy hunger.",
  },
  {
    itemName: "Desserts",
    image: dessertImg,
    subtitle: "Sweet and indulgent treats to end your meal.",
  },
  {
    itemName: "Beverages",
    image: beverageImg,
    subtitle: "Refreshing drinks that complement every dish.",
  },
  {
    itemName: "Salads",
    image: saladImg,
    subtitle: "Healthy, light, and vibrant greens to enjoy.",
  },
  {
    itemName: "Snacks",
    image: snackImg,
    subtitle: "Quick and tasty bites for any time of the day.",
  },
  {
    itemName: "Kids Menu",
    image: kidsImg,
    subtitle: "Kid-friendly meals made with love and care.",
  },
  {
    itemName: "Chef's Special",
    image: chefImg,
    subtitle: "Exclusive creations by our talented chefs.",
  },
];

const HomeScrollComponent = () => {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div className="w-full mx-2 p-4 sm:mx-6 sm:p-6 h-full">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <h1 className="font-sans font-extrabold text-lg sm:text-xl lg:text-2xl">
            What's in Your Mind?
          </h1>
          <div className="flex items-center gap-2">
            <button
              className="border-2 border-gray-600 rounded-full p-2 sm:p-3"
              onClick={scrollLeft}
            >
              <FaArrowLeft />
            </button>
            <button
              className="border-2 border-gray-600 rounded-full p-2 sm:p-3"
              onClick={scrollRight}
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Cards Section */}
        <div
          ref={scrollContainerRef}
          className="flex items-center overflow-x-scroll gap-3 mt-5 scrollbar-hide"
        >
          {foodArray.map((foodItem, i) => (
            <div
              className="flex-shrink-0 p-5 max-w-[90%] sm:max-w-[70%] md:max-w-[50%] lg:max-w-[25%]"
              key={i}
            >
              <Card sx={{ width: "100%" }} elevation={5}>
                <CardMedia
                  sx={{ height: { xs: 120, sm: 140 } }}
                  image={foodItem.image} // Corrected the key
                  title={foodItem.itemName}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    sx={{
                      fontSize: { xs: "1rem", sm: "1.25rem" },
                    }}
                  >
                    {foodItem.itemName}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      fontSize: { xs: "0.8rem", sm: "1rem", lg: "1.2rem" },
                    }}
                  >
                    {foodItem.subtitle}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default HomeScrollComponent;
