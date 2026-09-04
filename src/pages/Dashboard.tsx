import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadDialog from "../components/UploadDialog";
import logo from "../assets/logo3.png";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CloudDownloadOutlinedIcon from "@mui/icons-material/CloudDownloadOutlined";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [uploadOpen, setUploadOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [totalMaterials, setTotalMaterials] = useState("0");

  useEffect(() => {
    let cancelled = false;

    const loadTotalMaterials = async () => {
      try {
        const response = await fetch(
          "http://localhost:5098/api/Materials/total"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch total materials");
        }
        const data = await response.json();

if (!cancelled) {
  setTotalMaterials(String(data.totalMaterial));
}
      } catch (error) {
        console.error("Error fetching total materials:", error);
      }
    };

    void loadTotalMaterials();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleSearch = () => {
    const trimmed = query.trim();

    if (!trimmed) return;

    navigate(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    setSidebarOpen(false);
  };


  return (
    <div className="min-h-screen bg-[#f7f8fa] text-gray-900">

      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >

        <div className="flex h-20 items-center border-b border-gray-100 px-4">

          <div className="flex items-center">
            <img
              src={logo}
              alt="PastQuest"
              className="h-17 w-37.5ject-contain"
            />
          </div>
  
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto text-gray-500 lg:hidden"
          >
            <CloseIcon />
          </button>

        </div>

        <nav className="flex-1 px-4 py-6">

   <SidebarItem
  icon={<SearchOutlinedIcon fontSize="small" />}
  label="Questions"
  onClick={() => navigate("/questions")}
/>

          <SidebarItem
            icon={<CloudDownloadOutlinedIcon fontSize="small" />}
            label="Downloads"
            onClick={() => scrollToSection("downloads")}
          />

          <SidebarItem
            icon={<CloudUploadOutlinedIcon fontSize="small" />}
            label="Uploads"
            onClick={() => scrollToSection("uploads")}
          />

        </nav>
     
        <div className="border-t border-gray-100 p-4">

          <button
            onClick={() => navigate("/login")}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-50 hover:text-red-600"
          >
            <LogoutOutlinedIcon fontSize="small" />
            <span>Logout</span>
          </button>

        </div>

      </aside>

      <div className="lg:ml-64">
        <header
          id="search-questions"
          className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gray-200 bg-white/95 px-5 backdrop-blur md:px-8"
        >
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-gray-600 hover:bg-gray-100 lg:hidden"
          >
            <MenuIcon />
          </button>

          <div className="hidden max-w-xl flex-1 md:block">

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-gray-50 transition focus-within:border-[#2f4571] focus-within:ring-2 focus-within:ring-[#2f4571]/40">

              <SearchIcon
                className="ml-4 text-gray-400"
                fontSize="small"
              />

              <input
                type="text"
                placeholder="Search past questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent px-3 text-sm outline-none placeholder:text-gray-400"
              />

              <button
                onClick={handleSearch}
                className="mr-1 rounded-md bg-[#2f4571] px-5 py-2 text-sm font-medium text-white transition hover:bg-[#26395e]"
              >
                Search
              </button>

            </div>

          </div>

          <div className="flex items-center gap-3">

            <div className="hidden text-right sm:block">

              <p className="text-sm font-semibold text-gray-800">
                Student
              </p>

              <p className="text-xs text-gray-400">
                Welcome back
              </p>

            </div>
          </div>

        </header>

        <main className="px-5 py-8 md:px-8">

          <div className="mb-7 md:hidden">

            <div className="flex h-11 items-center rounded-lg border border-gray-200 bg-white transition focus-within:border-[#2f4571] focus-within:ring-2 focus-within:ring-[#2f4571]/40">

              <SearchIcon
                className="ml-4 text-gray-400"
                fontSize="small"
              />

              <input
                type="text"
                placeholder="Search past questions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent px-3 text-sm outline-none"
              />

              <button
                onClick={handleSearch}
                className="mr-1 rounded-md bg-[#2f4571] px-4 py-2 text-sm text-white"
              >
                Search
              </button>

            </div>

          </div>

          <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">

            <div>

              <p className="mb-1 text-sm text-gray-500">
                Dashboard
              </p>

              <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                Welcome back
              </h1>

              <p className="mt-2 text-sm text-gray-500">
                Find, download and share past questions with ease.
              </p>

            </div>

            <button
              onClick={() => setUploadOpen(true)}
              className="flex w-fit items-center gap-2 rounded-lg bg-[#2f4571] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#26395e]"
            >
              <CloudUploadOutlinedIcon fontSize="small" />
              Upload Question
            </button>

          </div>

          <section className="mb-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Total Questions"
              value={totalMaterials}
              description="Available resources"
              icon={<SearchOutlinedIcon />}
            />

            <StatCard
              title="Downloads"
              value="0"
              description="Questions downloaded"
              icon={<CloudDownloadOutlinedIcon />}
            />

            <StatCard
              title="Your Uploads"
              value="0"
              description="Questions uploaded"
              icon={<CloudUploadOutlinedIcon />}
            />

            <StatCard
              title="Pending Uploads"
              value="0"
              description="Awaiting approval"
              icon={<ScheduleOutlinedIcon />}
            />

          </section>
         
          <div className="grid gap-6 xl:grid-cols-3">        
            <section
              id="downloads"
              className="scroll-mt-24 rounded-xl border border-gray-200 bg-white xl:col-span-2"
            >

              <div className="flex items-center justify-between border-b border-gray-100 px-7 py-6">

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Recent Downloads
                  </h2>

                  <p className="mt-1 text-sm text-gray-400">
                    Your recently downloaded questions
                  </p>
                </div>

                <button
                  onClick={() => navigate("/downloads")}
                  className="flex items-center text-sm font-medium text-[#2f4571] hover:underline"
                >
                  View all
                  <KeyboardArrowRightIcon fontSize="small" />
                </button>

              </div>

              <EmptyState
                type="downloads"
                onAction={() => navigate("/search")}
              />

            </section>
            
            <section className="rounded-xl border border-gray-200 bg-white">

              <div className="border-b border-gray-100 px-7 py-6">

                <h2 className="text-lg font-semibold text-gray-900">
                  Popular Courses
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Most accessed resources
                </p>
              </div>

              <div className="space-y-2 p-6 min-h-40 flex items-center justify-center">

                <h3 className="text-gray-500">No Course Yet</h3>

              </div>

            </section>

          </div>
           <section
            id="uploads"
            className="mt-6 scroll-mt-24 rounded-xl border border-gray-200 bg-white"
          >

            <div className="flex items-center justify-between border-b border-gray-100 px-7 py-6">

              <div>

                <h2 className="text-lg font-semibold text-gray-900">
                  Your Uploads
                </h2>

                <p className="mt-1 text-sm text-gray-400">
                  Questions and materials you've uploaded
                </p>

              </div>

              <button
                onClick={() => navigate("/upload")}
                className="text-sm font-medium text-[#2f4571] hover:underline"
              >
                View all
              </button>

            </div>

            <EmptyState
              type="uploads"
              onAction={() => setUploadOpen(true)}
            />

          </section>

          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-8">

            <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">

              <div className="flex items-center gap-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-[#eef1f7] text-[#2f4571]">
                  <CloudUploadOutlinedIcon fontSize="medium" />
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Have a question?
                  </h2>
                </div>

              </div>
                 <button
                className="rectangular-lg border border-[#2f4571] px-4 py-1 text-sm font-semibold text-[#2f4571] transition hover:bg-[#2f4571] hover:text-white"
              >
               Help </button>
            </div>

          </section>

        </main>

      </div>

      <UploadDialog
        open={uploadOpen}
        onClose={() => setUploadOpen(false)}
      />

    </div>
  );
}

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function SidebarItem({ icon, label, active = false, onClick,}: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`mb-1 flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm transition ${
        active
          ? "bg-[#eef1f7] font-semibold text-[#2f4571]"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function StatCard({
  title,
  value,
  description,
  icon,
}: StatCardProps) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6">

      <div className="mb-6 flex items-center justify-between">

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>

        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#eef1f7] text-[#2f4571]">
          {icon}
        </div>

      </div>

      <h3 className="text-3xl font-bold text-gray-900">
        {value}
      </h3>

      <p className="mt-1 text-xs text-gray-400">
        {description}
      </p>

    </div>
  );
}

interface EmptyStateProps {
  type: "downloads" | "uploads";
  onAction: () => void;
}

function EmptyState({
  type,
  onAction,
}: EmptyStateProps) {

  const isDownloads = type === "downloads";

  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-xl bg-[#eef1f7] text-[#2f4571]">

        {isDownloads ? (
          <CloudDownloadOutlinedIcon fontSize="large" />
        ) : (
          <CloudUploadOutlinedIcon fontSize="large" />
        )}

      </div>

      <h3 className="text-lg font-semibold text-gray-800">
        {isDownloads
          ? "No downloads yet"
          : "No uploads yet"}
      </h3>

      <button
        onClick={onAction}
        className="mt-6 rounded-lg border border-[#2f4571] px-6 py-3 text-sm font-medium text-[#2f4571] transition hover:bg-[#2f4571] hover:text-white"
      >
         {isDownloads
          ? "Find Questions"
          : "Upload Question"}
      </button>
    </div>
  );
}