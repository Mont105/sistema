import React, { createContext, useContext, useMemo, useState } from 'react';
import { usuarios } from '@/lib/mockData';
import type { Usuario } from '@/types';

interface AuthContextValue {
  currentUser: Usuario | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<Usuario | null>>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<Usuario | null>(usuarios[0] ?? null);

  const value = useMemo(
    () => ({
      currentUser,
      setCurrentUser,
    }),
    [currentUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
