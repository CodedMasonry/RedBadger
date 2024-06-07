import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

const isDomain = RegExp(
  "^(?!-)[A-Za-z0-9-]+([\\-\\.]{1}[a-z0-9]+)*\\.[A-Za-z]{2,6}$"
);

const formSchema = z.object({
  url: z.union([
    z.string().ip({
      message: "Unknown IP or Domain Name",
    }),
    z.string().regex(isDomain),
  ]),
});

export default function NewServerModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {},
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add server</DialogTitle>
          <DialogDescription>
            Add a server to to interact and manage it through the client.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((values) => {
              handleSubmit({ setOpen, values });
            })}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Server URL</FormLabel>
                  <FormControl>
                    <Input placeholder="0.0.0.0" {...field} />
                  </FormControl>
                  <FormDescription>
                    The url to the sever. Examples: 0.0.0.0 or
                    https://google.com
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={(_) => {
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit">Add Server</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function handleSubmit({
  setOpen,
  values,
}: {
  setOpen: (open: boolean) => void;
  values: z.infer<typeof formSchema>;
}) {
  setOpen(false);

  toast.success("Server Added", {
    description: values.url + " has been added to list of servers.",
  });
}
