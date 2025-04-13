import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

export default function IndexPage() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Expense Book</h1>
      <Button asChild>
        <Link to="/create">Create New Expense Book</Link>
      </Button>
    </div>
  );
}
