import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Server, servers } from "@/components/server-selection";
import React from "react";
import { Import, Server as ServerIcon } from "lucide-react";

export default function HomePage({
  setModalOpen,
}: {
  setModalOpen: (modalOpen: boolean) => void;
}) {
  const [selectedServer, setSelectedServer] = React.useState<Server | null>(
    null
  );

  return (
    <Command>
      <CommandInput placeholder="Search Servers..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="Available Servers">
          {servers.map((server) => (
            <CommandItem
              key={server.value}
              value={server.value}
              onSelect={(value) => {
                setSelectedServer(
                  servers.find((priority) => priority.value === value) || null
                );
              }}
            >
              <ServerIcon className="mr-2" />
              {server.label}
            </CommandItem>
          ))}
        </CommandGroup>

        <CommandGroup>
          <CommandItem
            key="Import Server"
            value="import server"
            onSelect={(_) => {
              setModalOpen(true);
            }}
          >
            <Import className="mr-2" />
            Import Server
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
