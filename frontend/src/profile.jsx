import { useState } from "react";

function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    skills: "",
    experience: "",
    picture: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleFileChange = (e) => {
    setProfile({ ...profile, picture: URL.createObjectURL(e.target.files[0]) });
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <h2 className="text-3xl font-extrabold mb-6">Candidate Profile</h2>
      <form className="bg-white shadow rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Skills
            </label>
            <input
              type="text"
              name="skills"
              value={profile.skills}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Experience
            </label>
            <textarea
              name="experience"
              value={profile.experience}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg"
            ></textarea>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            {profile.picture && (
              <img
                src={profile.picture}
                alt="Profile"
                className="mt-4 w-32 h-32 object-cover rounded-full"
              />
            )}
          </div>
        </div>
        <button
          type="button"
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}

export default Profile;
