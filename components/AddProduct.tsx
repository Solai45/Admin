"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

type FormErrors = {
  title?: string;
  price?: string;
  category?: string;
  description?: string;
  image?: string;
  rate?: string;
  count?: string;
};

export default function AddProduct() {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState<FormErrors>({});
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    rating: {
      rate: "",
      count: "",
    },
  });
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      image: "",
      price: "",
      category: "",
      rating: {
        rate: "",
        count: "",
      },
    });
    setError({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;

    // nested rating update
    if (name === "rate" || name === "count") {
      setForm((prev) => ({
        ...prev,
        rating: {
          ...prev.rating,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    validate(name, value);
  };

  const validate = (name: string, value: string) => {
    let error = "";

    if (name === "title") {
      if (!value.trim()) error = "Title is required";
    }
    if (name === "price") {
      if (!value.trim()) error = "Price is required";
      else if (Number(value) < 0) error = "invalid value for Price";
    }
    if (name === "category") {
      if (!value.trim()) error = "category is required";
    }
    if (name === "description") {
      if (!value.trim()) error = "description is required";
    }

    if (name === "image") {
      if (!value.trim()) error = "image is required";
      else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value))
        error = "Enter a valid image URL";
    }

    if (name === "category") {
      if (!value.trim()) error = "category is required";
    }
    if (name === "rate") {
      if (!value.trim()) error = "rate is required";
      else if (value && (Number(value) < 0 || Number(value) > 5))
        error = "Rating must be between 0 and 5";
    }
    if (name === "count") {
      if (!value.trim()) error = "count is required";
      else if (value && Number(value) < 0) error = "Count cannot be negative";
    }

    setError((prev) => ({ ...prev, [name]: error }));

    return error;
  };

  const handleSubmit = async () => {
    const titleError = validate("title", form.title);
    const priceError = validate("price", form.price);
    const categoryError = validate("category", form.category);
    const descriptionError = validate("description", form.description);
    const imageError = validate("image", form.image);
    const rateError = validate("rate", form.rating.rate);
    const countError = validate("count", form.rating.count);

    if (
      titleError ||
      priceError ||
      categoryError ||
      descriptionError ||
      imageError ||
      rateError ||
      countError
    )
      return;

    await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    // reset & close
    resetForm();

    setOpen(false);
    router.refresh();
  };

  return (
    <>
      {/* Open Button */}

      <button
        onClick={() => {
          setOpen(true);
          setError({});
          resetForm();
        }}
        className="px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200 cursor-pointer"
      >
        + Add Product
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6">
            {/* Close */}
            <div className="flex justify-between items-center mb-6 mx-2">
              {/* Title */}
              <h2 className="text-xl font-semibold text-gray-800 ">
                Add Product
              </h2>
              <button
                onClick={() => {
                  setOpen(false);
                  setError({});
                }}
                className=" text-gray-500 hover:text-gray-700 cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <div className="space-y-4">
              <div>
                <input
                  name="title"
                  type="text"
                  onChange={handleChange}
                  placeholder="Product title"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {error.title && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.title}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="price"
                  type="number"
                  onChange={handleChange}
                  placeholder="Price"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {error.price && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.price}
                  </p>
                )}
              </div>

              <div>
                <input
                  name="category"
                  type="text"
                  onChange={handleChange}
                  placeholder="Category"
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {error.category && (
                  <p className="text-red-500 text-sm mt-1 mx-1">
                    *{error.category}
                  </p>
                )}
              </div>

              {/* Image */}
              <div>
                <input
                  name="image"
                  value={form.image}
                  onChange={handleChange}
                  placeholder="Image URL"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error.image && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.image}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  name="description"
                  placeholder="Description"
                  onChange={handleChange}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                />
                {error.description && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.description}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="rate"
                  value={form.rating.rate}
                  onChange={handleChange}
                  placeholder="Rating (0 - 5)"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error.rate && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.rate}
                  </p>
                )}
              </div>
              <div>
                <input
                  type="number"
                  name="count"
                  value={form.rating.count}
                  onChange={handleChange}
                  placeholder="Review count"
                  className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
                {error.count && (
                  <p className="text-red-500 text-sm mt-1 ms-1">
                    *{error.count}
                  </p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                onClick={() => {
                  setOpen(false);
                  setError({});
                  resetForm();
                }}
                className="px-4 py-2 rounded-lg border text-gray-600 hover:bg-gray-100 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSubmit}
                className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 cursor-pointer"
                disabled={Boolean(
                  error.title ||
                  error.price ||
                  error.category ||
                  error.description ||
                  error.image ||
                  error.rate ||
                  error.count,
                )}
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
