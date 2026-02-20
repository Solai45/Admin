"use client";

import { useState } from "react";
import { Pencil, X } from "lucide-react";
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
export default function EditProduct({
  id,
  title,
  description,
  category,
  price,
  image,
  rating,
  count,
}: {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  image: string;
  rating: number;
  count: number;
}) {
  const [open, setOpen] = useState(false);
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

  const [error, setError] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

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
    let err = "";

    if (name === "title" && !value.trim()) err = "Title is required";

    if (name === "price") {
      if (!value.trim()) err = "Price is required";
      else if (Number(value) < 0) err = "Price cannot be negative";
    }

    if (name === "category" && !value.trim()) err = "Category is required";

    if (name === "description" && !value.trim())
      err = "Description is required";

    if (name === "image") {
      if (!value.trim()) err = "Image URL is required";
      else if (!/^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/i.test(value))
        err = "Enter valid image URL";
    }

    if (name === "rate") {
      if (!value.trim()) err = "Rating is required";
      else if (Number(value) < 0 || Number(value) > 5)
        err = "Rating must be between 0 and 5";
    }

    if (name === "count") {
      if (!value.trim()) err = "Review count is required";
      else if (Number(value) < 0) err = "Count cannot be negative";
    }

    setError((prev) => ({ ...prev, [name]: err }));
    return err;
  };

  const handleSave = async () => {
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

    console.log("Sending data:", {
      id,
      ...form,
    });
    await fetch("/api/products", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Number(id),
        title: form.title.trim(),
        description: form.description.trim(),
        price: Number(form.price) || 0,
        category: form.category.trim(),
        image: form.image.trim(),
        rating: {
          rate: Number(form.rating.rate) || 0,
          count: Number(form.rating.count) || 0,
        },
      }),
    });
    setOpen(false);
    router.refresh();
    console.log("FORM DATA:", form);
  };

  return (
    <>
      {/* Pencil Button */}
      <button
        onClick={() => {
          setForm({
            title,
            description,
            category,
            price: String(price),
            image,
            rating: {
              rate: String(rating),
              count: String(count),
            },
          });

          setOpen(true);
        }}
        className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-50 cursor-pointer"
      >
        <Pencil size={16} /> Edit
      </button>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 space-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Edit Product</h2>
              <button
                onClick={() => setOpen(false)}
                className="bg-red-50 text-red-500 hover:bg-red-100 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Image Preview */}
            <div className="flex justify-center">
              <img
                src={form.image}
                className="w-24 h-24 object-contain border rounded-lg p-2"
              />
            </div>

            {/* Image URL */}
            <div>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="Image URL"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.image && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.image}
                </p>
              )}
            </div>

            {/* Title */}
            <div>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Title"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.title && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.title}
                </p>
              )}
            </div>

            <div>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Description"
                className="w-full border rounded-lg px-3 py-2"
              />

              {error.description && (
                <p className="text-red-500 text-sm mt-1 text-left">
                  *{error.description}
                </p>
              )}
            </div>

            <div>
              {/* Category */}
              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.category && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.category}
                </p>
              )}
            </div>

            <div>
              {/* Price */}
              <input
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.price && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.price}
                </p>
              )}
            </div>

            {/* Rating & Count */}
            <div>
              <input
                name="rate"
                type="number"
                value={form.rating.rate}
                onChange={handleChange}
                placeholder="Rating"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.rate && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.rate}
                </p>
              )}
            </div>

            <div>
              <input
                name="count"
                type="number"
                value={form.rating.count}
                onChange={handleChange}
                placeholder="Count"
                className="w-full border rounded-lg px-3 py-2"
              />
              {error.count && (
                <p className="text-red-500 text-sm mt-1 ms-1 text-left">
                  *{error.count}
                </p>
              )}
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer"
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
