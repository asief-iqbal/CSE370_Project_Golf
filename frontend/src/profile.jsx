import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    picture: "",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, picture: URL.createObjectURL(e.target.files[0]) });
  };

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveProfile = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  return (

      <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 ">
          <h2 className="text-3xl font-bold text-gray-900">Profile</h2>
          <button
            onClick={toggleEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profile.picture || "https://via.placeholder.com/100"}
                alt="Profile"
                className="w-24 h-24 object-cover rounded-full border border-white"
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
              )}
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">
                {profile.name || "Your Name"}
              </h3>
              <p className="text-gray-500">{profile.email || "Your Email"}</p>
            </div>
          </div>

          {isEditing ? (
            <form className="mt-6 space-y-6">
              <div>
                <label className="block text-gray-700 font-medium">Name</label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">Email</label>
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Skills
                </label>
                <input
                  type="text"
                  name="skills"
                  value={profile.skills}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Enter your skills"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium">
                  Experience
                </label>
                <textarea
                  name="experience"
                  value={profile.experience}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg"
                  placeholder="Describe your experience"
                ></textarea>
              </div>
            </form>
          ) : (
            <div className="mt-6 space-y-4">
              <p>
                <strong>Name:</strong> {profile.name || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong> {profile.email || "Not provided"}
              </p>
              <p>
                <strong>Skills:</strong> {profile.skills || "Not provided"}
              </p>
              <p>
                <strong>Experience:</strong>{" "}
                {profile.experience || "Not provided"}
              </p>
            </div>
          )}
          {isEditing && (
            <button
              onClick={saveProfile}
              className="mt-6 px-4 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700"
            >
              Save Changes
            </button>
          )}
        </div>
      </div>
  );
}

export default Profile;
