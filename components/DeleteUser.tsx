"use client";

import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

export default function DeleteUser({ id }: { id: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Delete this user?")) return;

    await fetch("/api/admin", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    router.refresh(); // ✅ refresh server data
  };
  return (
    <div>
      <button
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition cursor-pointer"
        onClick={handleDelete}
      >
        <Trash2 size={16} />
      </button>
    </div>
  );
}
