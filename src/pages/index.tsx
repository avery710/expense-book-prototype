import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/stores/hooks";
import { removeExpenseBook } from "@/stores/slices/expenseBooksSlice";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

export default function IndexPage() {
  const expenseBooks = useAppSelector(state => state.expenseBooks);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string, name: string) => {
    dispatch(removeExpenseBook(id));
    toast.success(`Deleted expense book: ${name}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Book</h1>
      <Button asChild className="mb-6">
        <Link to="/expenseBook/create">Create New Expense Book</Link>
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expenseBooks.length === 0 ? (
          <div className="text-muted-foreground">No expense books yet.</div>
        ) : (
          expenseBooks.map(book => (
            <Card key={book.id}>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{book.name}</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/expenseBook/$id/edit" params={{ id: book.id }}>
                      Edit
                    </Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(book.id, book.name)}
                  >
                    Delete
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="mb-2">
                  <span className="font-medium">Members:</span>{" "}
                  {book.members.join(", ")}
                </div>
                <div>
                  <span className="font-medium">Currency:</span> {book.currency}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
