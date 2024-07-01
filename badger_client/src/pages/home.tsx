import { Import, Settings } from "lucide-solid";
import { servers } from "@/components/servers";
import { For } from "solid-js";
import { open } from "@tauri-apps/plugin-dialog";
import { invoke } from "@tauri-apps/api/core";
import { toast } from "solid-sonner";
import { A } from "@solidjs/router";
import { Button, buttonVariants } from "@/components/ui/button";

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
          <Button variant="default" class="mt-4" onClick={handleImport}>
            <Import class="mr-2" />
            Import Server
          </Button>
        </div>
      )}

      <A
        class={`${buttonVariants({
          variant: "outline",
        })} absolute bottom-4 left-4`}
        href="/settings"
      >
        <Settings size={20} class="mr-1" />
        Global Settings
      </A>
    </div>
  );
}
