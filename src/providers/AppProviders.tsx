import React, { createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { AppProvidersProps } from "./AppProviders.types";

interface User {
  id: string;
  avatar: string;
  username: string;
}

export const AppContext = createContext({
  isUserLoggedIn: false,
  userInfo: { avatar: "" },
  isPopupActive: false,
  handleSetIsUserLoggedIn: (flag: boolean) => {},
  handleAddUserInfo: (data: User) => {},
  handleSetPopupActive: (flag:boolean) => {}
});

export const AppProviders = ({ children }: AppProvidersProps) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userInfo, addUserInfo] = useState({
    avatar: "",
  });
  const [isPopupActive,setPopupActive] = useState(false);

  const handleSetPopupActive = (flag:boolean) =>{
    setPopupActive(flag)
  }

  const handleSetIsUserLoggedIn = (flag: boolean) => {
    setIsUserLoggedIn(flag);
  };
  const handleAddUserInfo = (data: User) => {
    addUserInfo(data);
  };
  return (
    <Router>
      <AppContext.Provider
        value={{
          isUserLoggedIn,
          handleSetIsUserLoggedIn,
          userInfo,
          handleAddUserInfo,
          isPopupActive,
          handleSetPopupActive
        }}
      >
        {children}
      </AppContext.Provider>
    </Router>
  );
};
