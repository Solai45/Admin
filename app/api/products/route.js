import connectDB from "@/lib/mongodb.js";
import Products from "@/modals/Products";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  // 🔥 get last product
  const lastProduct = await Products.findOne().sort({ id: -1 });

  // generate next id
  const nextId = lastProduct ? lastProduct.id + 1 : 1;

  const newProducts = await Products.create({
    ...body,
    id: nextId,
  });

  return Response.json(newProducts);
}

export async function PUT(req) {
  try {
    await connectDB();

    const body = await req.json();
    const { id, ...updateData } = body;

    const updatedProduct = await Products.findOneAndUpdate(
      { id: Number(id) },
      { $set: updateData },
      {
        new: true,
        runValidators: false, // ✅ prevent cast crash
      },
    );

    return Response.json(updatedProduct);
  } catch (err) {
    console.error("PUT ERROR:", err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await Products.deleteOne({ id: Number(id) });

  return Response.json({ message: "Deleted Successfully" });
}

export async function GET() {
  await connectDB();

  const products = await Products.find().sort({ id: 1 });

  return Response.json(products);
}
