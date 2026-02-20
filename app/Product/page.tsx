import React from "react";
import connectDB from "@/lib/mongodb";
import Products from "@/modals/Products";

import BackButton from "@/components/BackButton";
import AddProduct from "@/components/AddProduct";
import ProductMenu from "@/components/ProductMenu";

export default async function Page() {
  await connectDB();

  const productsRaw = await Products.find().lean();

  const product = productsRaw.map((p: any) => ({
    ...p,
    _id: p._id.toString(), // ✅ convert ObjectId
  }));
  console.log(product);

  return (
    <div>
      <div className="max-w-6xl mx-auto p-6">
        <div className="my-4 flex justify-end">
          <BackButton />
        </div>
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200">
          {/* <!-- Header --> */}
          <div className="px-6 py-4 border-b bg-gray-50 flex justify-between items-center">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Products</h2>
              <p className="text-sm text-gray-500">Product list overview</p>
            </div>
            <div>
              <AddProduct />
            </div>
          </div>

          {/* <!-- Table --> */}
          <div>
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-100 text-gray-600 uppercase text-xs">
                <tr>
                  <th className="px-6 py-3">Image</th>
                  <th className="px-6 py-3">Title</th>
                  <th className="px-6 py-3">Category</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Rating</th>
                  <th className="px-6 py-3">Count</th>
                  <th className="px-6 py-3 text-right">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y">
                {product.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="text-center py-10 text-gray-400">
                      No users found
                    </td>
                  </tr>
                ) : (
                  product.map((x) => (
                    <tr
                      key={x._id.toString()}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="px-6 py-4">
                        <img
                          src={x.image}
                          className="w-14 h-14 object-contain rounded-lg border p-1"
                        />
                      </td>

                      <td className="px-6 py-4 font-medium text-gray-800 max-w-xs">
                        {x.title}
                      </td>

                      <td className="px-6 py-4">
                        <span className="px-3 py-1 text-xs font-semibold bg-blue-50 text-blue-600 rounded-full">
                          {x.category}
                        </span>
                      </td>

                      <td className="px-6 py-4 font-semibold text-gray-900">
                        {x.price}
                      </td>

                      <td className="px-6 py-4 text-yellow-500 font-semibold">
                        ⭐ {x.rating?.rate}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {x.rating?.count}
                      </td>
                      <td className="px-6 py-4 text-center relative">
                        <ProductMenu product={x} />
                      </td>
                    </tr>
                  ))
                )}
                {/* <!-- Row --> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
