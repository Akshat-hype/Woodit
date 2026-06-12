/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { authService } from '../services/auth.service';

const AuthContext = createContext(null);
const SESSION_KEY = 'woodit_session';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  const persistSession = useCallback((nextSession, nextUser) => {
    setSession(nextSession);
    setUser(nextUser);

    if (nextSession?.access_token) {
      localStorage.setItem(SESSION_KEY, JSON.stringify({ ...nextSession, user: nextUser }));
    } else {
      localStorage.removeItem(SESSION_KEY);
    }
  }, []);

  useEffect(() => {
    const savedSession = JSON.parse(localStorage.getItem(SESSION_KEY) || 'null');
    if (savedSession?.access_token) {
      setSession(savedSession);
      setUser(savedSession.user ?? null);
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials) => {
    const response = await authService.login(credentials);
    const { session: nextSession, user: nextUser } = response.data.data;
    persistSession(nextSession, nextUser);
    return nextUser;
  }, [persistSession]);

  const signup = useCallback(async (payload) => {
    const response = await authService.signup(payload);
    return response.data.data.user;
  }, []);

  const logout = useCallback(async () => {
    try {
      await authService.logout();
    } finally {
      persistSession(null, null);
    }
  }, [persistSession]);

  const isAdmin = user?.user_metadata?.role === 'admin';
  const value = useMemo(
    () => ({ user, session, loading, isAdmin, login, signup, logout }),
    [user, session, loading, isAdmin, login, signup, logout]
  );

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
