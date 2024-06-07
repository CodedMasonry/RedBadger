import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown, CirclePlus, Server } from "lucide-react";
import NewServerModal from "@/components/new-server";

type Server = {
  value: string;
  label: string;
};

const servers: Server[] = [
  {
    value: "0.0.0.0",
    label: "0.0.0.0",
  },
  {
    value: "192.168.0.1",
    label: "192.168.0.1",
  },
  {
    value: "localhost",
    label: "localhost",
  },
];

export function ServerSelection() {
  const [open, setOpen] = React.useState(false);
  const [modalOpen, SetModalOpen] = React.useState(false);
  const [selectedServer, setSelectedServer] = React.useState<Server | null>(
    null
  );

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[200px] justify-between">
            <Server className="mr-2" />
            <span className="grow text-left">
              {selectedServer ? <>{selectedServer.label}</> : <>Set Server</>}
            </span>
            <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ServerList
            setOpen={setOpen}
            setModelOpen={SetModalOpen}
            setSelectedServer={setSelectedServer}
          />
        </PopoverContent>
      </Popover>
      <NewServerModal open={modalOpen} setOpen={SetModalOpen} />
    </>
  );
}

function ServerList({
  setOpen,
  setModelOpen,
  setSelectedServer,
}: {
  setOpen: (open: boolean) => void;
  setModelOpen: (modalOpen: boolean) => void;
  setSelectedServer: (Server: Server | null) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Search Servers..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Local Servers">
          {servers.map((server) => (
            <CommandItem
              key={server.value}
              value={server.value}
              onSelect={(value) => {
                setSelectedServer(
                  servers.find((priority) => priority.value === value) || null
                );
                setOpen(false);
              }}
            >
              <Server className="mr-2" />
              {server.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup>
          <CommandItem
            key="Add Server"
            value="add server"
            onSelect={(_) => {
              setOpen(false);
              setModelOpen(true);
            }}
          >
            <CirclePlus className="mr-2"/>
            Add Server
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}