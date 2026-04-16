import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import API from "../services/api";

function Profile() {
  const { user } = useContext(AuthContext);
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: ""
  });

  const handleChangePassword = async () => {
    console.log(passwordData)
    try {
      await API.put("/api/profile/change-password", passwordData);

      alert("Password updated successfully");

      setPasswordData({
        currentPassword: "",
        newPassword: ""
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-[calc(100svh-80px)] bg-gray-100 flex justify-center items-center">
        <div className="bg-white shadow-lg rounded-2xl p-8 flex flex-col items-center gap-5 w-80">

          <img
            src="/default-avatar.png"
            className="w-32 h-32 rounded-full object-cover border-4 border-gray-200"
            alt="avatar"
          />

          <h2 className="text-xl font-semibold text-gray-800">
            {user?.user?.name}
          </h2>

          <div className="text-gray-600 text-sm space-y-1 text-center">
            <p><span className="font-medium">Email:</span> {user?.user?.email}</p>
            <p className="inline-block bg-blue-100 text-blue-700 my-2 px-3 py-1 rounded-full text-sm capitalize">{user?.user?.role}</p>
          </div>
          <p
            onClick={() => setShowPasswordForm(!showPasswordForm)}
            className="text-blue-600 cursor-pointer mt-4 text-center hover:underline"
          >
            Change Password
          </p>
        </div>


      </div>
      {showPasswordForm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">

          <div className="bg-white p-6 rounded-xl w-80 shadow-xl space-y-4">

            <h3 className="text-lg font-semibold text-gray-800">
              Change Password
            </h3>

            <input
              type="password"
              placeholder="Current Password"
              value={passwordData.currentPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  currentPassword: e.target.value
                })
              }
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <input
              type="password"
              placeholder="New Password"
              value={passwordData.newPassword}
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  newPassword: e.target.value
                })
              }
              className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-400"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={handleChangePassword}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1.5 rounded-md"
              >
                Update
              </button>

              <button
                onClick={() => setShowPasswordForm(false)}
                className="bg-gray-300 hover:bg-gray-400 px-4 py-1.5 rounded-md"
              >
                Cancel
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}

export default Profile;