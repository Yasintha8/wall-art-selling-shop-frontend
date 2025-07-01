import { useEffect, useState } from "react";
import axios from "axios";

export default function Profile() {
  const [user, setUser] = useState(null); // Holds current user data
  const token = localStorage.getItem("token"); // Assuming JWT is stored here

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/user/current", {
          headers: {
            Authorization: `Bearer ${token}`, // Make sure this middleware uses token
          },
        });
        setUser(res.data.user); // Save the returned user
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchCurrentUser();
  }, [token]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Manage My Account</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Personal Profile */}
        <div className="bg-white p-5 rounded shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Personal Profile</h2>
          </div>

          {user ? (
            <>
            <p className="text-sm text-gray-600 mb-2">Name: {user.firstName}</p>
            <p className="text-sm text-gray-600 mb-2">Username: {user.lastName}</p>
            <p className="text-sm text-gray-600 mb-4">Email: {user.email}</p>
            <p className="text-sm text-gray-600 mb-2">Phone: {user.phone}</p>
            </>
          ) : (
            <p className="text-sm text-gray-500">Loading user...</p>
          )}
        </div>
      </div>
    </div>
  );
}
