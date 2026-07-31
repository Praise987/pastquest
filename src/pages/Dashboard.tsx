import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import UploadDialog from "../components/UploadDialog";
import logo from "../assets/logo5.png";
import SearchIcon from "@mui/icons-material/Search";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";


export default function Home() {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);

  const handleSearch = () => {
    const trimmed = query.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-gray-100 py-10">

        <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6">


          <section className="overflow-hidden rounded-3xl bg-white shadow-sm">

            <div className="grid gap-10 p-10 md:grid-cols-2 md:p-14">

              <div className="flex flex-col justify-center">

                <h1 className="text-5xl font-bold text-gray-900">
                  PastQuest
                </h1>

                <p className="mt-5 text-lg text-gray-600">
                  Find past questions, revise smarter and prepare confidently
                  for your examinations.
                </p>

                <div className="mt-8 flex overflow-hidden rounded-xl border border-gray-300">

                  <div className="flex items-center px-4 text-gray-400">
                    <SearchIcon />
                  </div>

                  <input
                    type="text"
                    placeholder="Search by course code, department..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 px-4 py-4 outline-none"
                  />

                  <button
                    onClick={handleSearch}
                    className="bg-blue-700 px-8 font-medium text-white transition hover:bg-blue-800"
                  >
                    Search
                  </button>

                </div>

              </div>

              <div className="flex items-center justify-center">

                <img
                  src={logo}
                  alt="PastQuest"
                  className="w-72 opacity-90"
                />

              </div>

            </div>

          </section>

<section className="rounded-3xl bg-white p-10 shadow-sm">
  <div className="mb-8 max-w-xl">
  <div className="flex overflow-hidden rounded-xl border border-gray-300">
    <div className="flex items-center px-4 text-gray-400">
      <SearchIcon />
    </div>

    <input
      type="text"
      placeholder="Search Downloads"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 flow: px-4 py-3 outline-none"
    />

    <button
      onClick={handleSearch}
      className="bg-blue-700 px-6 text-white hover:bg-blue-800"
    >
      Search
    </button>
  </div>

  
</div>

<h1 className="text-3xl textalign: left font-bold text-gray-900">Downloads</h1>
  <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 p-30 text-center">
    
    <CloudDownloadOutlinedIcon
      sx={{ fontSize: 70 }}
      className="text-blue-600"
    />

    <h2 className="mt-6 text-2xl font-semibold">
      No Downloads Yet?
    </h2>

    <p className="mx-auto mt-4 max-w-xl text-gray-600">
      Download past questions to help you revise and prepare for your examinations
    </p>

    <button
      onClick={() => navigate("/downloads")}          
      className="mt-8 rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
    >
      Download Question
    </button>
  </div>
</section>

<section className="rounded-6xl bg-white p-10 shadow-sm">
  <div className="mb-8 max-w-lg">
  <div className="flex overflow-hidden rounded-xl border border-gray-300">
    <div className="flex items-center px-4 text-gray-400">
      <SearchIcon />
    </div>

    <input
      type="text"
      placeholder="Search Uploads"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className="flex-1 px-4 py-3 outline-none"
    />

    <button
      onClick={handleSearch}
      className="bg-blue-700 px-6 text-white hover:bg-blue-800"
    >
      Search
    </button>
  </div>
</div>
          
            <div className="rounded-2xl border-2 border-dashed border-blue-300 bg-blue-50 py-24 px- text-center">

              <CloudUploadOutlinedIcon
                sx={{ fontSize: 70 }}
                className="text-blue-600"
              />
              

              <h2 className="mt-6 text-2xl font-semibold">
               No Uploads Yet?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-gray-600">
                Upload past questions to help other students revise and prepare
              </p>

              <button
                onClick={() => setUploadOpen(true)}
                className="mt-8 rounded-xl bg-blue-700 px-8 py-3 font-semibold text-white transition hover:bg-blue-800"
              >
                Upload Question
              </button>

            </div>

          </section>


          <section className="overflow-hidden rounded-3xl bg-blue-700">

            <div className="grid items-center gap-10 p-10 md:grid-cols-2">

              <div>

                <h2 className="text-4xl font-bold text-white">
                  Ready to Help Other Students?
                </h2>

                <p className="mt-5 text-lg text-blue-100">
                  Every upload strengthens the library and helps students
                  prepare better for examinations.
                </p>

                <button
                  onClick={() => setUploadOpen(true)}
                  className="mt-8 rounded-xl bg-white px-8 py-3 font-semibold text-blue-700 transition hover:bg-gray-100"
                >
                  Upload Now
                </button>

              </div>

              <div className="flex justify-center">

                <img
                  src={logo}
                  alt="PastQuest"
                  className="w-72 opacity-30"
                />

              </div>

            </div>

          </section>

        </div>

      </main>

      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

      <Footer />
    </>
  );
}