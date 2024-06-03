import { createContext, useState, useEffect } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const loggedIn = localStorage.getItem("userIsLoggedIn") === "true";
    const storedUserName = localStorage.getItem("userName") || "";
    setLoggedIn(loggedIn);
    setUserName(storedUserName);
  }, []);

  return (
    <LoginContext.Provider
      value={{ isLoggedIn, setLoggedIn, userName, setUserName }}
    >
      {children}
    </LoginContext.Provider>
  );
};
