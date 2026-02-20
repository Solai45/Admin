import connectDB from "@/lib/mongodb";
import User from "@/modals/Admin";

import BackButton from "@/components/BackButton";
import AddUserModal from "@/components/AddUserModal";

import DeleteUser from "@/components/DeleteUser";
import EditUser from "@/components/EditUser";
import ReadUser from "@/components/ReadUser";

export default async function Page() {
  await connectDB();
  const users = await User.find();
  // console.log(users);
  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="my-4 flex justify-end">
        <BackButton />
      </div>

      <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-200">
        {/* Table Header Section */}
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between ">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Users List</h2>
            <p className="text-sm text-gray-500">
              All registered users in the system
            </p>
          </div>
          <div>
            <AddUserModal />
          </div>
        </div>

        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-10 text-gray-400">
                  No users found
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user._id.toString()}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {user.name}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold
                  ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-green-100 text-green-700"
                  }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4 flex items-center justify-center gap-3">
                    {/* View Button */}
                    <ReadUser
                      id={user._id.toString()}
                      name={user.name}
                      email={user.email}
                      role={user.role}
                    />
                    {/* Edit Button */}
                    <EditUser
                      id={user._id.toString()}
                      name={user.name}
                      email={user.email}
                      password={user.password}
                      role={user.role}
                    />

                    {/* Delete Button */}
                    <DeleteUser id={user._id.toString()} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
