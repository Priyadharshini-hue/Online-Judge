import { createContext, useContext, useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [tokenExpiration, setTokenExpiration] = useState(
    sessionStorage.getItem('tokenExpiration')
  );
  const [token, setToken] = useState(sessionStorage.getItem('jwtToken'));
  const [userId, setUserId] = useState('');

  const navigate = useNavigate();

  const login = (authToken, userId) => {
    sessionStorage.setItem('jwtToken', authToken);
    sessionStorage.setItem('userId', userId);
    setToken(authToken);
    setUserId(userId);

    const decoded = jwtDecode(authToken);
    const expirationTimestamp = decoded.exp;
    const expirationDate = new Date(expirationTimestamp * 1000);
    sessionStorage.setItem('tokenExpiration', expirationDate.toString());
    setTokenExpiration(expirationDate.toString());
  };

  const logout = () => {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('tokenExpiration');
    sessionStorage.removeItem('userId');

    setToken('');
    setTokenExpiration('');
    setUserId('');

    navigate('/user/signIn');
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      const storedToken = sessionStorage.getItem('jwtToken');
      const storedUserId = sessionStorage.getItem('userId');
      setToken(storedToken);
      setUserId(storedUserId);

      if (token && tokenExpiration) {
        const currentTime = new Date().getTime();
        const expirationTime = new Date(tokenExpiration).getTime();

        if (currentTime >= expirationTime) {
          console.log('From auth context: token expired');
          logout();
        }
      }
    };

    checkTokenExpiration();

    const intervalId = setInterval(checkTokenExpiration, 10000);
    return () => clearInterval(intervalId);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiration]);

  return (
    <AuthContext.Provider value={{ token, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
