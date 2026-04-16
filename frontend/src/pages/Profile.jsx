import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { user, logout } = useContext(AuthContext);
  console.log(user)
  const navigate = useNavigate();

   const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <div>
        <h2>My Profile</h2>
        <p>Name: {user?.user?.name}</p>
        <p>Email: {user?.user?.email}</p>
        <p>Role: {user?.user?.role}</p>

        <button onClick={handleLogout}>Logout</button>
      </div>
    </>
  );
}

export default Profile;