import React, { useEffect, useMemo, useState } from "react";
import { DataProvider, GlobalActionsProvider } from "@plasmicapp/host";
import Cookies from "js-cookie";

export const AuthGlobalContext = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      setToken(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzcsImlhdCI6MTc0NjIwOTQ1MH0.LTJbzXOQ5yb5r8g3mEcfxLieqogrMite4_ySug5Gg1E"
      );
      
      setUser({
        id: 5,
        uuid: "01531eaa-fac6-427f-905d-24a2afa4f450",
        name: "Andrés",
        middleName: "Murillo",
        lastName: "Orozco",
        email: "admin@inprodi.com.mx",
        blocked: false,
        confirmed: true,
        createdAt: "2024-02-27T23:26:08.434Z",
        role: {
          id: 4,
          name: "owner",
        },
        company: {
          id: 1,
          uuid: "f309fc71-2a63-4f71-a26a-12a7effc915f",
          name: "Inprodi Web Studio",
          isActive: true,
          primaryColor: "#328cf6",
          completedOnboarding: true,
          urlParam: "inprodi-studio",
          logotype: {
            id: 225,
            url: "https://vizion.nyc3.digitaloceanspaces.com/ce03e9446b39acd822a8a63591bff598.jpeg",
          },
        },
        phone: {
          id: 254,
          code: "+52",
          number: "33 1432 8388",
        },
        image: {
          id: 131,
          url: "https://vizion.nyc3.digitaloceanspaces.com/b3c738e1e808358667d99e4dc76fee46.png",
        },
      });
      setLoading(false);
      return;
    }

    const storedToken = Cookies.get("token");
    const storedUser = Cookies.get("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(storedUser ? JSON.parse(storedUser) : {});
    } else {
      setToken(null);
      setUser(null);
    }

    setLoading(false);
  }, []);

  const actions = useMemo(
    () => ({
      login: (token, user) => {
        setToken(token);
        setUser(user);

        localStorage.setItem("primaryColor", user?.company?.primaryColor);

        Cookies.set("token", token, { expires: 7, secure: true });
        Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
      },
      update: (user) => {
        setUser(user);
        Cookies.set("user", JSON.stringify(user), { expires: 7, secure: true });
      },
      logout: () => {
        setToken(null);
        setUser(null);

        localStorage.removeItem("primaryColor");
        localStorage.removeItem("scheme");

        Cookies.remove("token");
        Cookies.remove("user");
      },
    }),
    []
  );

  if (loading) {
    return null;
  }

  return (
    <GlobalActionsProvider contextName="AuthGlobalContext" actions={actions}>
      <DataProvider name="token" data={token}>
        <DataProvider name="user" data={user}>
          {children}
        </DataProvider>
      </DataProvider>
    </GlobalActionsProvider>
  );
};
