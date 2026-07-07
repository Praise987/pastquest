import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo5.png";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import UploadDialog from "../components/UploadDialog";
import SearchIcon from '@mui/icons-material/Search';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';

const PROPERTIES = [
  {
    title: "Fast Search",
    description:
      "Quickly search past questions by course code, department, or topic.",
    icon: SearchIcon,
  },
  {
    title: "Organized Resources",
    description:
      "Materials are neatly arranged by level, faculty, and semester.",
    icon: FolderCopyOutlinedIcon,
  },
  {
    title: "Student Community",
    description:
      "Share your past questions and help students prepare more effectively.",
    icon: Diversity3OutlinedIcon,
  },
];

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


      <section className="relative flex min-h-screen items-center overflow-hidden bg-linear-to-br from-[#1f3c88] to-[#224aa8]">

        <img
          src={logo}
          alt=""
          className="pointer-events-none absolute -right-7.5 top-1/2 w-87.5 -translate-y-1/2 opacity-60 select-none md:w-175 lg:w-225"
        />

        <div className="container relative z-10 mx-auto max-w-6xl px-6">

          <div className="mx-auto max-w-3xl">

            <h1 className="text-center text-4xl font-bold text-white sm:text-5xl md:text-7xl">
              PastQuest
            </h1>

            <p className="mt-4 text-center text-white/90 md:text-xl">
              Find past questions, revise smarter, and pass with confidence.
            </p>

            <div className="mt-10 rounded-3xl bg-white p-4 shadow-2xl">

              <div className="flex flex-col gap-4 md:flex-row">

                <div className="relative flex-1">

                  <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700" />

                  <input
                    type="text"
                    placeholder="Search course code, course, department or level..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="w-full rounded-xl border-2 border-blue-700 py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600"
                  />

                </div>

                <button
                  onClick={handleSearch}
                  className="rounded-xl bg-blue-700 px-8 py-3 font-medium text-white transition hover:bg-blue-800"
                >
                  Search
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      <section className="container mx-auto max-w-6xl px-6 py-24">

        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-10 text-center shadow-xl">

          <h2 className="text-3xl font-bold">
            No uploads yet
          </h2>

          <p className="mt-6 text-gray-600">
            Be the first student to contribute to the PastQuest library.
            Upload your past questions and help other students succeed.
          </p>

          <button
            onClick={() => setUploadOpen(true)}
            className="mt-8 rounded-xl bg-blue-700 px-8 py-3 font-medium text-white hover:bg-blue-800"
          >
            Upload the first question
          </button>

        </div>

      </section>

      <section className="flex min-h-screen items-center bg-linear-to-br from-[#1f3c88] to-[#224aa8]">

        <div className="container mx-auto max-w-6xl px-6">

          <h2 className="mb-14 text-center text-4xl font-bold text-white">
            Why PastQuest?
          </h2>

          <div className="grid gap-8 md:grid-cols-3">

            {PROPERTIES.map((feature, index) => {

              const Icon = feature.icon;

              return (

                <div
                  key={index}
                  className="rounded-3xl bg-white/10 p-8 transition hover:-translate-y-2 hover:bg-white/15"
                >

                  <Icon
                    className="mb-5 text-blue-300"
                    sx={{ fontSize: 34 }}
                  />

                  <h3 className="text-xl font-semibold text-white">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-white/70">
                    {feature.description}
                  </p>

                </div>

              );

            })}
          </div>

        </div>

      </section>
      <section className="relative flex min-h-screen items-center overflow-hidden bg-[#111828]">

        <img
          src={logo}
          alt=""
          className="pointer-events-none absolute -bottom-10 -right-15 w-[80%] opacity-80 md:w-[60%]"
        />

        <div className="container relative z-10 mx-auto max-w-6xl px-6">

          <div className="max-w-2xl">

            <h2 className="text-4xl font-bold text-white md:text-5xl">
              Got Past Questions to Share?
            </h2>

            <p className="mt-6 text-lg leading-8 text-white/80">
              Every upload helps another student prepare smarter and perform
              better in exams.
            </p>

            <button
              onClick={() => setUploadOpen(true)}
              className="mt-8 rounded-xl bg-blue-700 px-8 py-3 font-medium text-white transition hover:bg-blue-800"
            >
              Upload Now
            </button>

          </div>

        </div>

      </section>
      <UploadDialog open={uploadOpen} onClose={() => setUploadOpen(false)} />
      <Footer />
    </>
  );
}