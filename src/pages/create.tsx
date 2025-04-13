import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function CreateExpenseBookPage() {
  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" asChild>
          <Link to="/">Back</Link>
        </Button>
        <h1 className="text-2xl font-bold">Create New Expense Book</h1>
      </div>

      {/* Form will be added later */}
      <div className="bg-card rounded-lg p-6">
        <p className="text-muted-foreground">
          Create expense book form coming soon...
        </p>
      </div>
    </div>
  );
}
