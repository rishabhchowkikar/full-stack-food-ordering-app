import React, { useState } from "react";
import {
  Button,
  Chip,
  Divider,
  Paper,
  TextField,
  InputAdornment,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import loginSignupImage from "../assets/logoutPageImage.jpg";
import { FcGoogle } from "react-icons/fc";
import { FaUser, FaLock } from "react-icons/fa"; // Icons for username and password
import { Link } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const LoginAndSignUp = (props) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.handleFormSubmit(formData);
  };

  return (
    <div className="w-full mx-5 sm:mx-10 md:mx-15">
      <Paper
        elevation={10}
        className="grid grid-cols-1 md:grid-cols-2 items-center h-full"
      >
        <div className="flex flex-col items-center p-5 sm:p-8 md:p-14">
          <form
            className="flex flex-col gap-2 sm:gap-3 md:gap-5 items-start w-full p-3 sm:p-4 md:p-5"
            onSubmit={handleSubmit}
          >
            <h1 className="text-[18px] sm:text-[22px] md:text-[30px] font-bold text-left">
              {props.registerType}
            </h1>

            <TextField
              fullWidth
              size="small"
              placeholder="Username"
              type="text"
              color="success"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaUser />
                  </InputAdornment>
                ),
              }}
              required
            />

            <TextField
              fullWidth
              placeholder="Password"
              type="password"
              size="small"
              color="success"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FaLock />
                  </InputAdornment>
                ),
              }}
              required
            />
            <Stack
              direction="row"
              spacing={2}
              className="gap-1 sm:gap-2 md:gap-3"
            >
              <Button
                className="m-2 sm:m-3"
                type="submit"
                variant="contained"
                color="success"
                startIcon={
                  props.isLogin ? (
                    <CircularProgress color="secondary" size="15px" />
                  ) : (
                    ""
                  )
                }
                disabled={props.isLogin}
              >
                {props.registerType}
              </Button>
              <Button
                className="m-2 sm:m-3"
                variant="outlined"
                color="error"
                type="reset"
              >
                Reset
              </Button>
            </Stack>
          </form>
          <Divider className="w-full">
            <Chip label="OR" size="small" />
          </Divider>
          <Stack spacing={1} sm:spacing={2} className="my-2 sm:my-3 w-full p-3">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<FcGoogle />}
              size="small"
            >
              Continue with Google
            </Button>
          </Stack>
          <Divider className="w-full"></Divider>
          <div className="self-start p-2 sm:p-5">
            {props.registerType === "Login" ? (
              <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-medium">
                New to TastyGo?{" "}
                <Link to="/signup">
                  <span className="text-green-800/100 cursor-pointer">
                    Create Account
                  </span>
                </Link>
              </h3>
            ) : (
              <h3 className="text-[14px] sm:text-[16px] md:text-[18px] font-medium">
                Already have an Account?{" "}
                <Link to="/login">
                  <span className="text-green-800/100 cursor-pointer">
                    Login
                  </span>
                </Link>
              </h3>
            )}
          </div>
        </div>
        {/* Right Section */}
        <div
          className={`hidden sm:hidden md:flex items-center justify-center h-full backdrop-blur-lg relative`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${loginSignupImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute left-0 bottom-0 p-3 sm:p-5 flex flex-col items-start gap-2 sm:gap-3">
            <h1 className="text-white font-extrabold text-4xl sm:text-5xl md:text-6xl">
              {props.registerType === "Login"
                ? "Welcome Back!"
                : "Join The Feast!"}
            </h1>
            <h1 className="text-white text-lg font-serif sm:text-xl md:text-2xl">
              {props.registerType === "Login"
                ? "Craving something Delicious? Let's get you signed in and satisfy your hunger!"
                : "Create your account and dive into a world of delicious delights delivered to your door!"}
            </h1>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default LoginAndSignUp;
