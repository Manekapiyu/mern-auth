import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const logAxiosError = (label, error) => {
    console.error(`${label}:`, {
      message: error.message,
      code: error.code,
      url: error.config?.url,
      response: error.response?.data,
    });
  };

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/auth/is-auth`, {
        withCredentials: true,
      });

      if (data?.success) {
        setIsLoggedin(true);
        await getUserData();
      } else {
        throw new Error("Not authenticated");
      }
    } catch (error) {
      logAxiosError("Auth Check Failed", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Failed to authenticate"
      );
      setIsLoggedin(false);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true,
      });

      if (data?.success) {
        setUserData(data.userData);
        setIsLoggedin(true);
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      logAxiosError("User Data Fetch Error", error);
      toast.error(
        error?.response?.data?.message ||
          error.message ||
          "Unauthorized. Please log in."
      );
      setIsLoggedin(false);
    }
  };

  useEffect(() => {
    if (backendUrl) {
      getAuthState();
    } else {
      console.warn("Missing VITE_BACKEND_URL");
    }
  }, [backendUrl]);

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
    getAuthState,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};
