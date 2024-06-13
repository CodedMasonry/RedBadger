import { invoke } from "@tauri-apps/api/core";
import { listen } from "@tauri-apps/api/event";

export type Server = {
  value: string;
  label: string;
};
type eventArray = {
  message: String[];
};

// Needs to request th
export var servers: Server[] = await fetchList();

// For handling state updates to server list
listen("updateServerList", async (event) => {
    let array = event.payload as eventArray;
    servers = array.message.map((x) => ({
      value: x,
      label: x,
    })) as Server[];
  });

function fetchList() {
  return invoke("get_list")
    .then((msg) => {
      let array = msg as String[];
      return array.map((x) => ({
        value: x,
        label: x,
      })) as Server[];
    })
    .catch(() => {
      return [] as Server[];
    });
}
