import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { adminLogin, fetchProfile, getAdminToken, setAdminToken, clearAdminToken } from '@/lib/adminAuth';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored admin token on mount
    const checkAuth = async () => {
      const token = getAdminToken();
      if (token) {
        try {
          const profile = await fetchProfile(token);
          const userData: User = {
            id: profile._id || profile.id,
            email: profile.email,
            name: profile.name,
            role: profile.role
          };
          setUser(userData);
        } catch (error) {
          // Token is invalid, clear it
          clearAdminToken();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      const res = await adminLogin(email, password);
      
      if (res.role !== 'admin') {
        setIsLoading(false);
        return false;
      }

      const userData: User = {
        id: res._id,
        email: res.email,
        name: res.name,
        role: res.role
      };

      setUser(userData);
      setAdminToken(res.token);
      setIsLoading(false);
      return true;
    } catch (error) {
      setIsLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    clearAdminToken();
  };

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
