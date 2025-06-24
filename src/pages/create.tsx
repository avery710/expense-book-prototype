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

import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  members: string[];
  currency: string;
};

export default function CreateExpenseBookPage() {
  const memberOptions: Option[] = [
    { value: "Avery", label: "Avery" },
    { value: "Jisoo", label: "Jisoo" },
    { value: "Jennie", label: "Jennie" },
    { value: "Rose", label: "Rose" },
    { value: "Lisa", label: "Lisa" },
  ];

  const form = useForm<FormValues>({
    defaultValues: {
      name: "",
      members: [],
      currency: "USD",
    },
  });

  function onSubmit(values: FormValues) {
    alert(
      `Name: ${values.name}\nMembers: ${values.members.join(", ")}\nCurrency: ${values.currency}`
    );
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
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <input
                      type="text"
                      className="w-full rounded border px-3 py-2 text-base"
                      required
                      {...field}
                    />
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
