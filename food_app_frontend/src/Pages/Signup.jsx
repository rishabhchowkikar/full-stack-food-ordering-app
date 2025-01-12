import React, { useEffect, useState } from "react";
import LoginAndSignUp from "../components/LoginAndSignUp";
import { useAppContext, Actions } from "../store/appContext";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

const Signup = () => {
  const { dispatch, state } = useAppContext();
  const { authenticatedUser } = state;
  const [isSignUp, setIsSignUp] = useState(false);

  useEffect(() => {
    console.log(authenticatedUser);
  }, [authenticatedUser]);

  const signupHandler = async (formData) => {
    try {
      setIsSignUp(true);
      const response = await axiosInstance.post("/auth/register", formData);
      const data = response.data;
      console.log(data);

      dispatch(
        Actions.loginUser({
          username: data.username,
          id: data._id,
        })
      );

      toast.success("Sign Up Successfully");
      setIsSignUp(false);
    } catch (error) {
      toast.error("Error While Signing Up");
      console.error(`error in the signup function: ${error}`);
      setIsSignUp(false);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen mt-10">
      <LoginAndSignUp
        registerType="Sign Up"
        isLogin={isSignUp}
        handleFormSubmit={signupHandler}
      />
    </div>
  );
};

export default Signup;
