import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { useAppSelector } from "@/stores/hooks";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function IndexPage() {
  const expenseBooks = useAppSelector(state => state.expenseBooks);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Book</h1>
      <Button asChild className="mb-6">
        <Link to="/create">Create New Expense Book</Link>
      </Button>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {expenseBooks.length === 0 ? (
          <div className="text-muted-foreground">No expense books yet.</div>
        ) : (
          expenseBooks.map(book => (
            <Card key={book.id}>
              <CardHeader>
                <CardTitle>{book.name}</CardTitle>
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
