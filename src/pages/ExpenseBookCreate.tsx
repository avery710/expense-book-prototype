import ExpenseBookEditFields, {
  defaultValues,
  FormValues,
  schema,
} from "@/components/expenseBooks/EditFields";
import { useAppDispatch } from "@/stores/hooks";
import { addExpenseBook } from "@/stores/slices/expenseBooksSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";

import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export default function ExpenseBookCreatePage() {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit(values: FormValues) {
    dispatch(
      addExpenseBook({
        id: uuidv4(),
        name: values.name,
        members: values.members,
        currency: values.currency,
      })
    );
    toast.success("Expense book created!");
    form.reset();
    navigate({ to: "/" });
  }

  return <ExpenseBookEditFields form={form} onSubmit={onSubmit} />;
}
