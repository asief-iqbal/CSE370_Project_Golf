import { useState } from "react";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const dummyJobs = [
    {
      title: "Software Engineer",
      company: "Tech Corp",
      location: "New York, NY",
    },
    {
      title: "Data Scientist",
      company: "Data Inc.",
      location: "San Francisco, CA",
    },
    {
      title: "Product Manager",
      company: "Innovate LLC",
      location: "Austin, TX",
    },
    {
      title: "UI/UX Designer",
      company: "Corporate Designs",
      location: "Miami, FL",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-[#ffffff] shadow sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <h1 className="animate-bounce text-2xl font-extrabold text-black">
            Chakri Hobe
          </h1>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a
                  href="/profile"
                  className="text-gray-700 hover:text-white font-semibold"
                >
                  Profile
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="text-gray-700 hover:text-white font-semibold"
                >
                  Login
                </a>
              </li>
              <li>
                <a
                  href="/jobs"
                  className="text-gray-700 hover:text-white font-semibold"
                >
                  Jobs
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold mb-4 text-white">
            Welcome to Chakri Hobe
          </h2>
          <p className="text-lg text-gray-600">
            Find your dream job or your next big opportunity.
          </p>
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search for jobs, companies, or locations..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full max-w-lg px-5 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* Job Listings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyJobs
            .filter((job) =>
              job.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((job, index) => (
              <div
                key={index}
                className="bg-[#242526] text-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-bold">{job.title}</h3>
                <p className="mt-2">{job.company}</p>
                <p className="mt-1">{job.location}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700">
                  Apply Now
                </button>
              </div>
            ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#ffffff] shadow mt-12 inset-x-0 buttom-0">
        <div className="max-w-7xl mx-auto px-6 py-8 text-center text-black">
          <p className="text-black">
            &copy; 2024 Chakri Hobe. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 mt-4">
            <a href="#" className=" hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Service
            </a>
            <a href="#" className=" hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
