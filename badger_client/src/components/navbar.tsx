import { Computer, LayoutDashboard, MoveLeft, Settings } from "lucide-solid";
import { createSignal, For } from "solid-js";

const Tabs = [
  {
    name: "Servers",
    url: "/",
    icon: <MoveLeft size={20} />,
  },
  {
    name: "Overview",
    url: "/:name",
    icon: <LayoutDashboard size={20} />,
  },
  {
    name: "Sessions",
    url: "/:name/sessions",
    icon: <Computer size={20} />,
  },
  {
    name: "Server Settings",
    url: "/:name/settings",
    icon: <Settings size={20} />,
  },
];

export default function NavBar() {
  const [currentTab, setTab] = createSignal("Servers");

  return (
    <div class="flex flex-col p-2 h-dvh bg-base-200 space-y-2">
      <For each={Tabs}>
        {(tab) => (
          <div class="tooltip tooltip-right" data-tip={tab.name}>
            {currentTab() == tab.name ? (
              <button class="btn btn-primary">{tab.icon}</button>
            ) : (
              <a class="btn" onClick={() => setTab(tab.name)} href={tab.url}>
                {tab.icon}
              </a>
            )}
          </div>
        )}
      </For>
    </div>
  );
}
