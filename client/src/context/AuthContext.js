import { createContext, useContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [tokenExpiration, setTokenExpiration] = useState(
    sessionStorage.getItem("tokenExpiration")
  );
  const [token, setToken] = useState(sessionStorage.getItem("jwtToken"));

  const navigate = useNavigate();

  const login = (authToken) => {
    sessionStorage.setItem("jwtToken", authToken);

    const decoded = jwtDecode(authToken);
    const expirationTimestamp = decoded.exp;
    const expirationDate = new Date(expirationTimestamp * 1000);

    sessionStorage.setItem("tokenExpiration", expirationDate.toString());
    setTokenExpiration(expirationDate.toString());
  };

  const logout = () => {
    sessionStorage.removeItem("jwtToken");
    sessionStorage.removeItem("tokenExpiration");

    setToken("");
    setTokenExpiration("");

    navigate("/user/signIn");
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(tokenExpiration).getTime();

        if (currentTime >= expirationTime) {
          console.log("From auth context: token expired");
          logout();
        }
        // console.log(token);
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 10000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiration]);

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
