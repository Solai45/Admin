import connectDB from "@/lib/mongodb";
import User from "@/modals/User";

export async function POST(req) {
  await connectDB();

  const body = await req.json();

  const newUser = await User.create(body);

  return Response.json(newUser);
}

export async function DELETE(req) {
  await connectDB();

  const { id } = await req.json();

  await User.findByIdAndDelete(id);

  return Response.json({ message: "Deleted Successfully" });
}

export async function PUT(req) {
  await connectDB();

  const { id, name, email, role } = await req.json();

  await User.findByIdAndUpdate(id, { name, email, role });

  return Response.json({ message: "Updated Successfully" });
}

export async function GET() {
  try {
    await connectDB();

    const users = await User.find().select("-password"); // hide password

    return Response.json(users);
  } catch (error) {
    return Response.json({ message: "Error fetching users" }, { status: 500 });
  }
}
