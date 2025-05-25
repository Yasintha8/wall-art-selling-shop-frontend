import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../../components/loader";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

export function Users() {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (!loaded) {
            const token = localStorage.getItem("token");
            axios
                .get(import.meta.env.VITE_BACKEND_URL + "/api/user/admin/all", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                })
                .then((response) => {
                    setUsers(response.data);
                    setLoaded(true);
                    console.log("Users fetched successfully", response.data);
                })
                .catch((error) => {
                    console.error("Error fetching users:", error);
                    toast.error("Failed to fetch users.");
                });
        }
    }, [loaded]);

    async function deleteUser(id) {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Please login first to delete User");
            return;
        }

        try {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL + "/api/user/" + id,
                {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                }
            );
            setLoaded(false);
            toast.success("User deleted successfully");
        } catch (error) {
            console.log(error);
            toast.error("User delete failed");
        }
    }

    return (
        <div className="w-full p-6">
            <h1 className="text-2xl font-semibold mb-4 text-gray-800">👥 User Management</h1>

            {loaded ? (
                <div className="overflow-x-auto rounded-lg shadow bg-white">
                    <table className="w-full table-auto">
                        <thead className="bg-gray-100 sticky top-0 z-10">
                            <tr>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">ID</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">First Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Last Name</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Email</th>
                                <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Role</th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Verified</th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Disabled</th>
                                <th className="px-4 py-3 text-center text-sm font-medium text-gray-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-b hover:bg-gray-50 transition-colors text-sm"
                                >
                                    <td className="px-4 py-3 text-gray-700">{user._id}</td>
                                    <td className="px-4 py-3 text-gray-700">{user.firstName}</td>
                                    <td className="px-4 py-3 text-gray-700">{user.lastName}</td>
                                    <td className="px-4 py-3 text-gray-700">{user.email}</td>
                                    <td className="px-4 py-3 text-gray-700">{user.role}</td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.isEmailVerified
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                            }`}
                                        >
                                            {user.isEmailVerified ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                user.isDisabled
                                                    ? "bg-red-100 text-red-600"
                                                    : "bg-green-100 text-green-600"
                                            }`}
                                        >
                                            {user.isDisabled ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3 text-center">
                                        <button
                                            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 text-xs rounded-md transition"
                                            onClick={() => deleteUser(user._id)}
                                        >
                                            <FaTrash className="text-xs" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <Loader />
            )}
        </div>
    );
}
