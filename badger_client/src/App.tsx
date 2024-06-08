import "./App.css";
// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import { ThemeProvider } from "@/components/theme-provider";
import { ServerSelection } from "./components/server-selection";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row p-2 space-x-2 border-b-2">
        <ServerSelection></ServerSelection>
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
