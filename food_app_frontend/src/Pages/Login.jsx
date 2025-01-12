import React, { useState, useEffect } from "react";
import LoginAndSignUp from "../components/LoginAndSignUp";
import { useAppContext, Actions } from "../store/appContext";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const Login = () => {
  const [isLogin, setIsLogin] = useState(false);
  const { dispatch, state } = useAppContext();
  const { authenticatedUser } = state;

  useEffect(() => {
    console.log(authenticatedUser);
  }, [authenticatedUser]);

  const loginHandler = async (formData) => {
    const userData = {
      username: formData.username,
      password: formData.password,
    };

    try {
      setIsLogin(true);
      const response = await axiosInstance.post("/auth/login", userData);
      const data = response.data;
      console.log(response.data);

      dispatch(
        Actions.loginUser({
          username: data.username,
          id: data._id,
        })
      );
      toast.success("Login Successfully");
      setIsLogin(false);
    } catch (error) {
      setIsLogin(false);
      toast.error("Error While Login");
      console.error(`error in the login function: ${error}`);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen mt-10">
      <LoginAndSignUp
        registerType="Login"
        isLogin={isLogin}
        handleFormSubmit={loginHandler}
      />
    </div>
  );
};

export default Login;
