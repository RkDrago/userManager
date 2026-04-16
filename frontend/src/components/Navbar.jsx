import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="bg-gray-900 text-white px-6 h-20 flex items-center shadow-md sticky top-0">

            <span className="font-bold text-2xl w-1/3">
                Welcome, {user?.user?.name}
            </span>

            <div className="flex gap-6 w-1/3 justify-center">
                <Link to="/profile" className="hover:text-gray-300">Profile</Link>
                {!(user?.user?.role === "user") && (
                    <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
                )}
            </div>

            <div className="w-1/3 flex justify-end">
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-m"
                >
                    Logout
                </button>
            </div>
        </nav>
    );
}

export default Navbar;