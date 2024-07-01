import { ParentProps, Suspense } from "solid-js";
import "./App.css";
import NavBar from "@/components/navbar";
import { useLocation, useParams } from "@solidjs/router";
import { Toaster } from "solid-sonner";

function App(props: ParentProps) {
  return (
    <div class="flex">
      {useParams().server ? <NavBar /> : <></>}
      <div class="w-full">
        <main>
          <Suspense>{props.children}</Suspense>
        </main>
      </div>

      <Toaster richColors />
    </div>
  );
}

export default App;
