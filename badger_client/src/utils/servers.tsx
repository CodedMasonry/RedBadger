import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";
import { createSignal } from "solid-js";

type eventArray = {
  message: string[];
};

export const [servers, setServers] = createSignal(await fetchList());

// For handling state updates to server list
listen("updateServerList", async (event) => {
  let array = event.payload as eventArray;
  setServers(array.message);
});

function fetchList() {
  return invoke("get_list")
    .then((msg) => {
      let array = msg as string[];
      return array;
    })
    .catch(() => {
      return [];
    });
}
