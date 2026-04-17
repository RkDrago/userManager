import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
    const { user } = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingUser, setEditingUser] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "user",
        status: "active"
    });

    // Admin check
    if (user?.user?.role === "user") {
        return <h2>Access Denied. Forbidden (403)</h2>;
    }

    const fetchUsers = async () => {
        try {
            const res = await API.get("/api/users");
            setUsers(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
    };

    const handleUpdate = async () => {
        try {
            await API.put(`/api/users/${editingUser.id}`, {
                email: editingUser.email,
                role: editingUser.role,
                status: editingUser.status
            });

            setEditingUser(null);
            fetchUsers();

        } catch (err) {
            console.log(err);
            alert("Update failed");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            await API.delete(`/api/users/${id}`);

            // instant UI update
            fetchUsers()

        } catch (err) {
            console.log(err);
            alert("Delete failed");
        }
    };

    const handleCreate = async () => {
        try {
            await API.post("/api/users", newUser);

            setShowForm(false);
            setNewUser({
                name: "",
                email: "",
                password: "",
                role: "user",
                status: "active"
            });

            fetchUsers(); // refresh

        } catch (err) {
            console.log(err);
            alert("Create failed");
        }
    };

    if (loading) return <h2>Loading users...</h2>;

    return (
        <>
            <Navbar />
            {loading ? (
                <div className="p-6 bg-gray-100 min-h-[calc(100svh-80px)]">
                    <h2 className="mx-auto p-8">Loading users...</h2>
                </div>
            ) : (
                    <div className="p-6 bg-gray-100 min-h-[calc(100svh-80px)]">

                        {/* Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">User List</h2>

                            {user?.user?.role === "admin" && (
                                <button
                                    onClick={() => setShowForm(true)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
                                >
                                    + Add User
                                </button>
                            )}
                        </div>

                        {/* Table */}
                        <div className="bg-white shadow-md rounded-lg overflow-hidden">
                            <table className="w-full text-left">
                                <thead className="bg-gray-200 text-gray-700 text-sm">
                                    <tr>
                                        <th className="p-3">Name</th>
                                        <th className="p-3">Email</th>
                                        <th className="p-3">Role</th>
                                        <th className="p-3">Status</th>
                                        <th className="p-3">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {users.map((u) => (
                                        <tr key={u._id} className="border-t hover:bg-gray-50">
                                            <td className="p-3">{u.name}</td>
                                            <td className="p-3">{u.email}</td>
                                            <td className="p-3 capitalize">{u.role}</td>
                                            <td className="p-3">
                                                <span className={`px-2 py-1 text-xs rounded-full ${u.status === "active"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-red-100 text-red-600"
                                                    }`}>
                                                    {u.status}
                                                </span>
                                            </td>

                                            <td className="p-4 flex gap-3">
                                                {user?.user?.role === "admin" || (user?.user?.role === "manager" && u.role !== "admin") ? (
                                                    <button
                                                        onClick={() => handleEdit(u)}
                                                        className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded-md text-sm"
                                                    >
                                                        Edit
                                                    </button>
                                                ) : (
                                                    <span className="text-gray-400 text-sm">Read only</span>
                                                )}
                                                {user?.user?.role === "admin" && (
                                                    <button
                                                        onClick={() => handleDelete(u._id)}
                                                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                                                    >
                                                        Delete
                                                    </button>

                                                )}

                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* EDIT MODAL */}
                        {editingUser && (
                            <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg w-80 space-y-4">
                                    <h3 className="text-lg font-semibold">Edit User</h3>

                                    <input
                                        className="w-full border p-2 rounded"
                                        value={editingUser.name}
                                        disabled
                                    />

                                    <input
                                        className="w-full border p-2 rounded"
                                        value={editingUser.email}
                                        disabled
                                    />

                                    <select
                                        className="w-full border p-2 rounded"
                                        value={editingUser.role}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, role: e.target.value })
                                        }
                                    >
                                        <option value="manager">Manager</option>
                                        <option value="user">User</option>
                                    </select>

                                    <select
                                        className="w-full border p-2 rounded"
                                        value={editingUser.status}
                                        onChange={(e) =>
                                            setEditingUser({ ...editingUser, status: e.target.value })
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleUpdate}
                                            className="bg-green-500 text-white px-4 py-1 rounded"
                                        >
                                            Save
                                        </button>

                                        <button
                                            onClick={() => setEditingUser(null)}
                                            className="bg-gray-300 px-4 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* CREATE MODAL */}
                        {showForm && (
                            <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
                                <div className="bg-white p-6 rounded-lg w-80 space-y-4">
                                    <h3 className="text-lg font-semibold">Create User</h3>

                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Name"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, name: e.target.value })
                                        }
                                    />

                                    <input
                                        className="w-full border p-2 rounded"
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, email: e.target.value })
                                        }
                                    />

                                    <input
                                        type="password"
                                        className="w-full border p-2 rounded"
                                        placeholder="Password"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, password: e.target.value })
                                        }
                                    />

                                    <select
                                        className="w-full border p-2 rounded"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, role: e.target.value })
                                        }
                                    >
                                        <option value="user">User</option>
                                        <option value="manager">Manager</option>
                                        <option value="admin">Admin</option>
                                    </select>

                                    <select
                                        className="w-full border p-2 rounded"
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, status: e.target.value })
                                        }
                                    >
                                        <option value="active">Active</option>
                                        <option value="inactive">Inactive</option>
                                    </select>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={handleCreate}
                                            className="bg-blue-500 text-white px-4 py-1 rounded"
                                        >
                                            Create
                                        </button>

                                        <button
                                            onClick={() => setShowForm(false)}
                                            className="bg-gray-300 px-4 py-1 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div> 
            )}
            
        </>
    );
}

export default Dashboard;