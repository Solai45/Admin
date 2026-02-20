"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";
import { useRouter } from "next/navigation";

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

  return (
    <>
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
        <Eye size={16} /> View
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

            <input
              name="image"
              value={form.image}
              placeholder="Image URL"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            {/* Title */}

            <input
              name="title"
              value={form.title}
              placeholder="Title"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            <textarea
              name="description"
              value={form.description}
              disabled
              rows={1}
              className="w-full border rounded-lg px-3 py-2 resize-none overflow-hidden"
              ref={(el) => {
                if (el) {
                  el.style.height = "auto";
                  el.style.height = el.scrollHeight + "px";
                }
              }}
            />

            {/* Category */}
            <input
              name="category"
              value={form.category}
              placeholder="Category"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            {/* Price */}
            <input
              name="price"
              type="number"
              value={form.price}
              placeholder="Price"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            {/* Rating & Count */}

            <input
              name="rate"
              type="number"
              value={form.rating.rate}
              placeholder="Rating"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            <input
              name="count"
              type="number"
              value={form.rating.count}
              placeholder="Count"
              className="w-full border rounded-lg px-3 py-2"
              disabled
            />

            {/* Actions */}
            <div className="flex justify-end gap-3 pt-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
