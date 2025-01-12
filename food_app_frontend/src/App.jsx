import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import ModifyItem from "./Pages/ModifyItem";
import SearchPage from "./Pages/SearchPage";
import Signup from "./Pages/Signup";
import { Toaster } from "react-hot-toast";
import { useAppContext, Actions } from "./store/appContext";
import { axiosInstance } from "./lib/axios.js";
import { useEffect } from "react";

function App() {
  const { state, dispatch } = useAppContext();
  const { authenticatedUser } = state;

  const checkingUserAuthenticated = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      const data = res.data;
      dispatch(
        Actions.loginUser({
          username: data.username,
          id: data._id,
        })
      );
    } catch (error) {
      console.log(`Error in the checkAuth ${error}`);
    }
  };

  useEffect(() => {
    checkingUserAuthenticated();
    console.log(authenticatedUser);
  }, []);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!authenticatedUser.id ? <Login /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!authenticatedUser.id ? <Signup /> : <Navigate to="/" />}
        />
        <Route path="/search" element={<SearchPage />} />
        {authenticatedUser?.id && (
          <Route
            path="/items"
            element={
              authenticatedUser?.id ? <ModifyItem /> : <Navigate to="/" />
            }
          />
        )}
      </Routes>
      <Toaster position="bottom-left" />
    </div>
  );
}

export default App;
