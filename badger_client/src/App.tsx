import { ParentProps } from "solid-js";
import "./App.css";
import NavBar from "./utils/navbar";
import { useLocation } from "@solidjs/router";

function App(props: ParentProps) {
  return (
    <div class="flex">
      {useLocation().pathname !== "/" ? <NavBar /> : <></>}
      <div class="w-full">
        <main>{props.children}</main>
      </div>

      
    </div>
  );
}

export default App;
