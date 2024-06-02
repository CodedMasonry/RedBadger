import "./App.css"
// import { useState } from "react";
// import { invoke } from "@tauri-apps/api/core";
import MyButton from "./components/MyButton";
import { Button } from "@/components/ui/button"


function App() {
  return (
    <div className="p-2">
      <h1 className="text-xl bold">Welcome to Tauri!</h1>
      <p>Please hold for testing</p>
      <Button variant="outline">Button</Button>
      <MyButton></MyButton>
    </div>
  );
}

export default App;
