import { getUserInfo, login, refreshTokenIfNeeded, changePassword } from '@/api/auth';
import { User } from '@/models/User';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
    isLoggedIn: boolean;
    userId: number | null;
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    getUserInfo: () => Promise<User | null>;
    changePassword: (oldPassword: string, newPassword: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType>({
    isLoggedIn: false,
    userId: null,
    login: async (_username: string, _password: string) => {},
    logout: () => {},
    getUserInfo: async () => null,
    changePassword: async (_oldPassword: string, _newPassword: string) => false
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });
  const [userId, setUserId] = useState<number | null>(null);

  useEffect(() => {
    const initializeAuth = async () => {
      const isAuthenticated = await refreshTokenIfNeeded();
      setIsLoggedIn(isAuthenticated);

      if (isAuthenticated) {
        const userInfo = await getUserInfo();
        if (userInfo) {
          setUserId(userInfo.userId);
        }
      }
    };

    initializeAuth();
  }, []);

  const handleLogin = async (username: string, password: string) => {
    const success = await login(username, password);
    if (success) {
      setIsLoggedIn(true);
      const userInfo = await getUserInfo();
      if (userInfo) {
        setUserId(userInfo.userId);
      }
      localStorage.setItem("isLoggedIn", "true");
    } else {
      setIsLoggedIn(false);
      throw new Error("Login failed. Please check your credentials.");
    }
  };

    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        setIsLoggedIn(false);
        setUserId(null);
    };

    const handleChangePassword = async (oldPassword: string, newPassword: string) => {
        try {
            const success = await changePassword(oldPassword, newPassword);
            return success;
        } catch (error) {
            console.error('Failed to change password:', error);
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, userId, login: handleLogin, logout: handleLogout, getUserInfo, changePassword: handleChangePassword }}>
            {children}
        </AuthContext.Provider>
    );
};
