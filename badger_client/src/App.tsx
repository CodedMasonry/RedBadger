import "./App.css";
// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import { ThemeProvider } from "@/components/theme-provider";
import { ServerSelection } from "@/components/server-selection";
import { Toaster } from "@/components/ui/sonner";
import React from "react";
import HomePage from "@/routes/home";

function App() {
  const [newServerModal, setServerModalOpen] = React.useState(false);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-row p-2 space-x-2 border-b-1">
        <ServerSelection
          modalOpen={newServerModal}
          setModalOpen={setServerModalOpen}
        />
      </div>
      <div className="justify-center">
        <HomePage setModalOpen={setServerModalOpen} />
      </div>
      <Toaster richColors />
    </ThemeProvider>
  );
}

export default App;
