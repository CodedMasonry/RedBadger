import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { createSignal } from "solid-js";
import { toast } from "solid-sonner";

type eventArray = {
  message: string[];
};

export const [servers, setServers] = createSignal(await fetchList());

// For handling state updates to server list
listen("updateServerList", async (event) => {
  let array = event.payload as eventArray;
  setServers(array.message);
});

async function fetchList() {
  return invoke("get_list")
    .then((msg) => {
      let array = msg as string[];
      return array;
    })
    .catch(() => {
      return [];
    });
}

export async function importServer() {
  await invoke("import_server")
    .then((msg) => {
      toast.success("Successfully imported server config.");
    })
    .catch(() => {
      toast.error("failed to improt server")
    });
}