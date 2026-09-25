import React, { createContext, useContext, useMemo, useState } from "react";
import { MOCK_CASHIER, MOCK_OUTLETS } from "@/data/mockData";
import { Cashier, Outlet } from "@/types";

interface AuthContextValue {
  cashier: Cashier | null;
  outlet: Outlet | null;
  isAuthenticating: boolean;
  outlets: Outlet[];
  login: (email: string, password: string) => Promise<void>;
  selectOutlet: (outletId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [cashier, setCashier] = useState<Cashier | null>(null);
  const [outlet, setOutlet] = useState<Outlet | null>(null);
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  const login = async (_email: string, _password: string) => {
    setIsAuthenticating(true);
    await new Promise((resolve) => setTimeout(resolve, 700));
    setCashier(MOCK_CASHIER);
    setIsAuthenticating(false);
  };

  const selectOutlet = (outletId: string) => {
    const found = MOCK_OUTLETS.find((o) => o.id === outletId) ?? null;
    setOutlet(found);
  };

  const logout = () => {
    setCashier(null);
    setOutlet(null);
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      cashier,
      outlet,
      isAuthenticating,
      outlets: MOCK_OUTLETS,
      login,
      selectOutlet,
      logout,
    }),
    [cashier, outlet, isAuthenticating]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
