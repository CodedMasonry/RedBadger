import { Import } from "lucide-solid";
import { servers } from "../utils/servers";
import { For } from "solid-js";

export default function Home() {
  return (
    <div class="text-center align-middle h-dvh">
      {servers().length > 0 ? (
        <For each={servers()}>{(server) => <p>{server}</p>}</For>
      ) : (
        <div class="top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2">
          <h1 class="text-2xl font-bold">No servers were found</h1>
          <p>We couldn't find any servers in the config directory</p>
          <button class="btn btn-primary mt-4">
            <Import />
            Import Server
          </button>
        </div>
      )}
    </div>
  );
}
