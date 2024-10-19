import { RouterProvider } from "react-router-dom";
import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "./components/ui/toaster";
import router from "./router/router";
import React from "react";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
      <React.StrictMode>
        <AuthProvider>
          <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <RouterProvider router={router} />
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </React.StrictMode>
    </>
  );
}

export default App;
