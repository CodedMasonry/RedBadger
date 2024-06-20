import { ParentProps } from "solid-js";
import "./App.css";
import NavBar from "./utils/navbar";
import { useLocation } from "@solidjs/router";
import { Toaster } from "solid-sonner";

function App(props: ParentProps) {
  return (
    <div class="flex">
      {useLocation().pathname !== "/" ? <NavBar /> : <></>}
      <div class="w-full">
        <main>{props.children}</main>
      </div>

      <Toaster />
    </div>
  );
}

export default App;
