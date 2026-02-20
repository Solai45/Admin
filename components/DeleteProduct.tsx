import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function DeleteProduct({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this Product?")) return;
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  };
  return (
    <div>
      <button
        className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
        onClick={handleDelete}
      >
        <Trash2 size={16} /> Delete
      </button>
    </div>
  );
}
