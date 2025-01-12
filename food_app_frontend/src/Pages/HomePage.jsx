import React, { useRef } from "react";
import HomeMenuItem from "../components/HomeMenuItem";
import HomeScrollComponent from "../components/HomeScrollComponent";

const HomePage = () => {
  return (
    <div className="mt-36 mx-4 sm:mt-36 sm:mx-8 lg:mt-36 lg:mx-36">
      <HomeScrollComponent />
      <HomeMenuItem />
    </div>
  );
};

export default HomePage;
