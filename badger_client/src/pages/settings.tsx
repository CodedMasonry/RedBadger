import { buttonVariants } from "@/components/ui/button";
import { A } from "@solidjs/router";
import { path } from "@tauri-apps/api";
import { createSignal } from "solid-js";
import { MoveLeft } from "lucide-solid";

const [cfg_dir, _] = createSignal(await path.appConfigDir());

export default function Settings() {
  return (
    <div>
      <h3 class="text-center text-2xl my-2">Info</h3>
      <Info />
      <A
        class={`${buttonVariants({
          variant: "outline",
        })} absolute bottom-4 left-4`}
        href="/"
      >
        <MoveLeft size={20} class="mr-1" />
        Return to Home
      </A>
    </div>
  );
}

function SettingsItem({ Name, Val }: { Name: string; Val: string }) {
  return (
    <div class="flex px-4">
      <p class="font-bold text-primary mr-4 uppercase">{Name}</p>
      <p>{Val}</p>
    </div>
  );
}

function Info() {
  return (
    <div>
      <SettingsItem Name="config Directory" Val={cfg_dir()} />
    </div>
  );
}
