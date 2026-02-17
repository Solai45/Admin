"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Pencil, Eye, EyeOff } from "lucide-react";

export default function EditUser({
  id,
  name,
  email,
  password,
  role,
}: {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ name, email, password, role });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target; // ✅ get values

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    validateField(name, value); // ✅ live validation
  };

  const validateField = (name: string, value: string) => {
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
      else if (!/^[A-Za-z\s]+$/.test(value))
        error = "Name must contain only letters";
    }

    if (name === "email") {
      if (!value.trim()) error = "Email is required";
      else if (!/\S+@\S+\.\S+/.test(value)) error = "Enter a valid email";
    }

    if (name === "password") {
      if (!value) error = "Password is required";
      else if (value.length < 6)
        error = "Password must be at least 6 characters";
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
    return error;
  };

  const handleUpdate = async () => {
    validateField("name", form.name);
    validateField("email", form.email);
    validateField("password", form.password);

    if (errors.name || errors.email || errors.password) return;

    await fetch("/api/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...form }),
    });

    setOpen(false);
    router.refresh(); // ✅ refresh server data
  };

  return (
    <>
      {/* Edit Button */}
      <button
        className="px-3 py-1.5 text-xs font-medium rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition cursor-pointer"
        onClick={() => {
          setForm({ name, email, password, role });
          setOpen(true);
        }}
      >
        <Pencil size={16} />
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit User</h2>
              <button
                className="bg-red-50 text-red-500 hover:bg-red-100 rounded-full w-7 h-6 flex items-center justify-center font-bold cursor-pointer"
                onClick={() => setOpen(false)}
              >
                X
              </button>
            </div>

            <div className="mb-4">
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.name && (
                <p className="text-red-500 text-xs ps-2 pt-1">*{errors.name}</p>
              )}
            </div>

            <div>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500 text-xs ps-2 pt-1">
                  *{errors.email}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 pr-10"
                  placeholder="Password"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-2 flex items-center text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs ps-2 pt-1">
                  *{errors.password}
                </p>
              )}
            </div>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleUpdate}
                disabled={Boolean(
                  errors.name || errors.email || errors.password,
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 cursor-pointer"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
