// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { redirect } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const port = import.meta.env.VITE_PORT;

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = async (username, password) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${port}/users/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if(data.error){
        throw new Error(data.error)
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user))
      setIsLoggedIn(true);
      return true;

    } catch (error) {
      setError(error.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  const signUp = async (username, password, firstname, lastname) => {
    setLoading(true);
    setError(false);

    try {
        const response = await fetch(`${port}/users/sign-up`, {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password, firstname, lastname })
        });

        const data = await response.json()

        if(data.error){
            throw new Error(data.error)
        }

        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        return true

    } catch(error) {
        setError(error.message)
        return false;
    } finally {
        setLoading(false)
    }
  }

  const clearError = () => {
    setError(null);
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, loading, error, login, logout, signUp, clearError }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
