import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Profile() {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Name: {user?.user?.name}</p>
      <p>Email: {user?.user?.email}</p>
      <p>Role: {user?.user?.role}</p>
    </div>
  );
}

export default Profile;