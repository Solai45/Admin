"use client";

import { useState } from "react";
import { Eye } from "lucide-react";

export default function ReadUser({
  id,
  name,
  email,
  role,
}: {
  id: string;
  name: string;
  email: string;
  role: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name, email, role });

  return (
    <>
      {/* Edit Button */}
      <button
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition cursor-pointer"
        onClick={() => {
          setForm({ name, email, role });
          setOpen(true);
        }}
      >
        <Eye size={16} />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">User ID</h2>
              <button
                className="bg-red-50 text-red-500 hover:bg-red-100 rounded-full w-8 h-6 flex items-center justify-center font-bold cursor-pointer"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>

            <input
              name="name"
              value={form.name}
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            <input
              name="email"
              value={form.email}
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            <input
              name="role"
              value={form.role}
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
