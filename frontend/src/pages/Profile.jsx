import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CheckCircle, XCircle, Camera, Save, X, Trash2 } from "lucide-react";
import api from "../api";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user, login, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || "");
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <p className="text-xl text-slate-500">
          Please login to view your profile
        </p>
      </div>
    );
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (selectedImage) {
        formData.append("avatar", selectedImage);
      }

      const response = await api.put("/auth/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Profile updated successfully");
        login(null, response.data.data); // Update user context (token remains same)
        setIsEditing(false);
        setPreviewUrl(null); // Clear preview after successful upload
        setSelectedImage(null); // Clear selected image
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await api.delete("/auth/profile");
        logout();
        toast.success("Account deleted successfully");
        navigate("/");
      } catch (err) {
        toast.error(err.response?.data?.message || "Failed to delete account");
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-[18px] md:text-4xl font-bold text-slate-900">
          My Profile
        </h1>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-indigo-600 text-white rounded-full font-semibold hover:bg-indigo-700 transition-colors shadow-lg"
          >
            Edit Profile
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 h-32 relative"></div>

        <div className="px-8 pb-8">
          <form onSubmit={handleUpdateProfile}>
            <div className="relative -mt-16 mb-6 flex flex-col md:flex-row items-center md:items-end gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg bg-white overflow-hidden">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-200 flex items-center justify-center text-4xl font-bold text-slate-500">
                      {user.name.charAt(0)}
                    </div>
                  )}
                </div>

                {isEditing && (
                  <label className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-full cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="text-white" size={32} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
              </div>

              <div className="flex-1 text-center md:text-left mb-2 w-full">
                {isEditing ? (
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="text-3xl font-bold text-slate-900 border-b-2 border-indigo-500 focus:outline-none w-full md:w-auto"
                    autoFocus
                  />
                ) : (
                  <h2 className="text-3xl font-bold text-slate-900">
                    {user.name}
                  </h2>
                )}
                <p className="text-slate-500">{user.email}</p>
              </div>

              {isEditing ? (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setPreviewUrl(null);
                      setSelectedImage(null);
                      setName(user.name);
                    }}
                    className="p-2 bg-slate-100 text-slate-600 rounded-full hover:bg-slate-200 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors shadow-lg disabled:opacity-50"
                  >
                    <Save size={20} />
                  </button>
                </div>
              ) : (
                <div
                  className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-semibold ${
                    user.isVerified
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {user.isVerified ? (
                    <>
                      <CheckCircle size={16} />
                      Verified Account
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      Unverified
                    </>
                  )}
                </div>
              )}
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">
                Account Details
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-slate-500">User ID</p>
                  <p className="font-mono text-slate-700 bg-slate-50 p-2 rounded border border-slate-100 inline-block text-sm">
                    {user.userId || user.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Email Address</p>
                  <p className="text-slate-900">{user.email}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-500">Account Type</p>
                  <p className="text-slate-900 capitalize">Standard User</p>
                </div>
              </div>

              {isEditing && (
                <div className="mt-8 pt-6 border-t border-red-100">
                  <h4 className="text-red-600 font-semibold mb-2">
                    Danger Zone
                  </h4>
                  <button
                    type="button"
                    onClick={handleDeleteAccount}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition-colors border border-red-200"
                  >
                    <Trash2 size={18} />
                    Delete Account
                  </button>
                </div>
              )}
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-4 border-b pb-2">
                Recent Activity
              </h3>
              <div className="text-slate-500 italic text-center py-8 bg-slate-50 rounded-lg border border-dashed border-slate-200">
                No recent activity to show
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
