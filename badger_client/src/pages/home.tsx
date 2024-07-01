import { Import, Settings } from "lucide-solid";
import { servers } from "../components/servers";
import { For } from "solid-js";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "solid-sonner";
import { useNavigate } from "@solidjs/router";

async function handleImport() {
  console.log("clicked");
  const file = await open({
    multiple: false,
    directory: false,
  });

  const result = invoke("import_server", { path: file?.path });
  toast.promise(result, {
    loading: "Importing...",
    success: (_) => {
      return "Successfully imported server";
    },
    error: (err) => {
      return `Failed to import server\n${err}`;
    },
  });
}

export default function Home() {
  return (
    <div class="text-center align-middle h-dvh">
      {servers().length > 0 ? (
        <For each={servers()}>{(server) => <p>{server}</p>}</For>
      ) : (
        <div class="top-1/2 left-1/2 fixed -translate-x-1/2 -translate-y-1/2">
          <h1 class="text-2xl font-bold">No servers were found</h1>
          <p>We couldn't find any servers in the config directory</p>
          <button class="btn btn-primary mt-4" onClick={handleImport}>
            <Import />
            Import Server
          </button>
        </div>
      )}

      <button
        class="btn btn-primary btn-sm absolute bottom-4 left-4"
        onClick={() => {
          const navigate = useNavigate();
          navigate("/settings");
        }}
      >
        <Settings size={20} />
        Global Settings
      </button>
    </div>
  );
}
