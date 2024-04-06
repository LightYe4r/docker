"use client";

import React, { createContext, useState, useEffect } from "react";

import { NextUIProvider } from "@nextui-org/react";

export function Providers({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ id: null, name: "" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
