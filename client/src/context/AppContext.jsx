import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`, {
        withCredentials: true, // ✅ Send cookies
      });

      if (data.success) {
        setUserData(data.userData);
        setIsLoggedin(true); // ✅ Optional: confirm login
      } else {
        toast.error(data.message || "Failed to fetch user data.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unauthorized. Please log in.");
      setIsLoggedin(false); // ✅ Reset login if fetch fails
    }
  };

  const value = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getUserData,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
