"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";

export default function AddUserModal() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const router = useRouter();

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

  const handleSubmit = async () => {
    // validate all fields before submit
    const nameError = validateField("name", form.name);
    const emailError = validateField("email", form.email);
    const passwordError = validateField("password", form.password);

    if (nameError || emailError || passwordError) return;

    if (errors.name || errors.email || errors.password) return;

    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // ✅ reset form
    setForm({
      name: "",
      email: "",
      password: "",
      role: "user",
    });
    setOpen(false);
    router.refresh(); // ✅ refresh server data
  };

  return (
    <>
      {/* Add Button */}
      <button
        onClick={() => {
          setForm({
            name: "",
            email: "",
            password: "",
            role: "user",
          }); // ✅ reset values
          setErrors({ name: "", email: "", password: "" }); // optional
          setOpen(true);
        }}
        className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
      >
        Add User
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            <h2 className="text-lg font-semibold">Add New User</h2>

            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 mb-0"
              />
              {errors.name && (
                <p className="text-red-500 text-xs ps-2 pt-1">*{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
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
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
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
                className="px-4 py-2 bg-gray-200 text-black rounded-lg cursor-pointer hover:bg-gray-300 transition duration-200"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                disabled={Boolean(
                  errors.name || errors.email || errors.password,
                )}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg cursor-pointer hover:bg-blue-700 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
