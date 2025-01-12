import React, { useState } from "react";
import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoPower } from "react-icons/io5";
import { Link } from "react-router-dom";
import { TbTruckDelivery } from "react-icons/tb";
import { MdOutlineAddShoppingCart } from "react-icons/md";
import { BiSearchAlt2 } from "react-icons/bi";
import { LuLogIn } from "react-icons/lu";
import { useAppContext } from "../store/appContext";
import { IconButton } from "@mui/material";
import { IoIosAddCircleOutline } from "react-icons/io";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { state } = useAppContext();
  const { authenticatedUser } = state;

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      toast.success("logout Successfully");
    } catch (error) {
      toast.error("Error in the logout Handler Function");
      console.log(`error in the logoutHandler function`);
    }
  };

  return (
    <header className="border-b fixed w-full top-0 z-40 backdrop-blur-lg shadow-lg">
      <div className="container mx-auto px-5 md:px-3 h-28">
        <div className="flex items-center justify-between h-full">
          <Link
            className="flex items-center gap-3 hover:opacity-80 transition-all"
            to="/"
          >
            <div className="w-12 h-12 p-2 rounded-lg bg-gray-700/10 flex items-center justify-center">
              <TbTruckDelivery className="w-10 h-10" />
            </div>
            <h1 className="text-[23px] font-extrabold font-sans hidden md:block lg:text-[23px] md:text-[17px]">
              TastyGo - Food Delivery System
            </h1>
          </Link>

          <Stack spacing={2} direction="row" alignItems="center">
            <Link to="/search">
              <div className="flex items-center gap-1 hover:text-orange-600">
                <BiSearchAlt2 size={24} />
                <h3 className="hidden text-[20px] sm:inline">Search</h3>
              </div>
            </Link>

            {authenticatedUser?.id && (
              <Link to="/items">
                <div className="flex items-center gap-1 hover:text-orange-600">
                  <IoIosAddCircleOutline size={24} />
                  <h3 className="hidden text-[20px] sm:inline">
                    Add Menu Item
                  </h3>
                </div>
              </Link>
            )}

            <Link>
              <div className="flex items-center gap-1 hover:text-orange-600">
                <MdOutlineAddShoppingCart size={24} />
                <h3 className="hidden text-[20px] sm:inline">Cart ({0})</h3>
              </div>
            </Link>

            {authenticatedUser?.id ? (
              <>
                <IconButton size="small" onClick={handleMenuOpen}>
                  <Avatar sx={{ bgcolor: "orangered", cursor: "pointer" }}>
                    {authenticatedUser.username.charAt(0).toUpperCase()}
                  </Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleMenuClose}
                  transformOrigin={{ horizontal: "right", vertical: "top" }}
                  anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  PaperProps={{
                    style: { minWidth: "150px" },
                  }}
                >
                  <MenuItem>
                    <h1 className="font-extrabold text-lg">
                      {authenticatedUser?.username}
                    </h1>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      logoutHandler();
                      window.location.reload();
                    }}
                    className="flex gap-2 text-red-700"
                  >
                    <IoPower />
                    Logout
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Link to="/login">
                <div className="flex items-center gap-1 hover:text-orange-600">
                  <LuLogIn size={24} />
                  <h3 className="hidden text-[20px] sm:inline">Login</h3>
                </div>
              </Link>
            )}
          </Stack>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
