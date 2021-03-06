import axios from "axios";
import { createContext, useState, useEffect } from "react";

const UserContext = createContext();

const UserProvider = (props) => {
  const [user, setUser] = useState({});

  const FetchUser = async () => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      let response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/user/verify`,
        {
          headers: { Authorization: userId },
        }
      );
      setUser(response.data.user);
    }
  };
  useEffect(FetchUser, []);
  const state = { userState: [user, setUser], FetchUser: FetchUser };

  return (
    <UserContext.Provider value={state}>{props.children}</UserContext.Provider>
  );
};

export { UserContext, UserProvider };
