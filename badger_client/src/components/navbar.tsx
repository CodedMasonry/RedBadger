import { Computer, LayoutDashboard, MoveLeft, Settings } from "lucide-solid";
import { createSignal, For } from "solid-js";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { A } from "@solidjs/router";

const Tabs = [
  {
    name: "Servers",
    url: "/",
    icon: <MoveLeft size={20} />,
  },
  {
    name: "Global Settings",
    url: "/settings",
    icon: <Settings size={20} />,
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
    <div class="flex flex-col p-2 h-dvh space-y-2">
      <For each={Tabs}>
        {(tab) => (
          <Tooltip placement="right" openDelay={10}>
            {currentTab() === tab.name ? (
              <TooltipTrigger as={Button<"button">} variant="default">
                {tab.icon}
              </TooltipTrigger>
            ) : (
              <TooltipTrigger>
                <A
                  class={buttonVariants({
                    variant: "outline",
                  })}
                  onClick={() => {
                    setTab(tab.name);
                  }}
                  href={tab.url}
                >
                  {tab.icon}
                </A>
              </TooltipTrigger>
            )}
            <TooltipContent>
              <p>{tab.name}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </For>
    </div>
  );
}
