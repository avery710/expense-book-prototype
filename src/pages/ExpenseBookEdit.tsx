import ExpenseBookEditFields, {
  defaultValues,
  FormValues,
  schema,
} from "@/components/expenseBooks/EditFields";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { updateExpenseBook } from "@/stores/slices/expenseBooksSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useParams } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function ExpenseBookFormPage() {
  const { id } = useParams({ from: "/expenseBook/$id/edit" }) as {
    id?: string;
  };

  const book = useAppSelector(state =>
    id ? state.expenseBooks.find(b => b.id === id) : undefined
  );

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: book || defaultValues,
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  function onSubmit() {
    if (!book) {
      toast.error("Expense book not found");
      return;
    }

    dispatch(
      updateExpenseBook({
        ...book,
        name: form.getValues("name"),
        members: form.getValues("members"),
        currency: form.getValues("currency"),
      })
    );
    toast.success("Expense book updated!");
    form.reset();
    navigate({ to: "/" });
  }

  return (
    <ExpenseBookEditFields
      form={form}
      onSubmit={onSubmit}
      submitButtonText="Update"
    />
  );
}
