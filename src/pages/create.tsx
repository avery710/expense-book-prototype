import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Link } from "@tanstack/react-router";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import MultiSelect, { type Option } from "@/components/ui/multiSelect";
import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";

const schema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(50, "Name must be at most 50 characters"),
  members: z.array(z.string()).min(1, "Select at least one member"),
  currency: z.string().min(1, "Select a currency"),
});

type FormValues = z.infer<typeof schema>;

export default function CreateExpenseBookPage() {
  const memberOptions: Option[] = [
    { value: "Avery", label: "Avery" },
    { value: "Jisoo", label: "Jisoo" },
    { value: "Jennie", label: "Jennie" },
    { value: "Rose", label: "Rose" },
    { value: "Lisa", label: "Lisa" },
  ];

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      members: [],
      currency: "TWD",
    },
  });

  function onSubmit(values: FormValues) {
    alert(
      `Name: ${values.name}\nMembers: ${values.members.join(", ")}\nCurrency: ${values.currency}`
    );
  }

  function handleError(errors: any) {
    const messages = Object.values(errors)
      .map((err: any) => err?.message)
      .filter(Boolean)
      .join("\n");
    if (messages) {
      toast.error(messages);
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/">Back</Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Expense Book</h1>
      </div>
      <div className="bg-card rounded-lg p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit, handleError)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter expense book name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="members"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Members</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={memberOptions}
                      value={memberOptions.filter(opt =>
                        field.value.includes(opt.value)
                      )}
                      onChange={opts =>
                        field.onChange(opts.map(opt => opt.value))
                      }
                      placeholder="Select members"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency</FormLabel>
                  <FormControl>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">TWD</SelectItem>
                        <SelectItem value="EUR">USD</SelectItem>
                        <SelectItem value="TWD">EUR</SelectItem>
                        <SelectItem value="JPY">JPY</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Create</Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
