"use client";

import { useEffect, useRef, useState } from "react";
import { Eye, MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import EditProduct from "./EditProduct";
import ReadProduct from "./ReadProduct";
import DeleteProduct from "./DeleteProduct";

type Props = {
  product: any;
};

export default function ProductMenu({ product }: Props) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
      >
        <MoreHorizontal size={18} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg z-50 overflow-hidden">
          <ReadProduct
            id={product.id}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            image={product.image}
            rating={product.rating?.rate}
            count={product.rating?.count}
          />

          <EditProduct
            id={product.id}
            title={product.title}
            description={product.description}
            category={product.category}
            price={product.price}
            image={product.image}
            rating={product.rating?.rate}
            count={product.rating?.count}
          />

          <DeleteProduct id={product.id} />
        </div>
      )}
    </div>
  );
}
