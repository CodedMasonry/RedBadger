import { path } from "@tauri-apps/api";
import { createSignal } from "solid-js";

const [cfg_dir, _] = createSignal(await path.appConfigDir());

export default function Settings() {
  return (
    <div>
      <h3 class="text-center text-2xl my-2">Info</h3>
      <Info />
    </div>
  );
}

function SettingsItem({ Name, Val }: { Name: string; Val: string }) {
  return (
    <div class="flex px-4">
      <p class="font-bold text-primary mr-4">{Name}</p>
      <p>{Val}</p>
    </div>
  );
}

function Info() {
  return (
    <div>
      <SettingsItem Name="config Directory" Val={cfg_dir()} />
    </div>
  )
}