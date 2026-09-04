import { useEffect, useState } from "react";

interface Material {
  id: number;
  courseTitle: string;
  courseCode: string;
  department: string;
  level: string;
  semester: string;
  year?: number;
  status: "Uploaded" | "Downloaded" | "Available";
  fileUrl?: string;
}

function useDebounce<T>(value: T, delay = 1000): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

export default function Questions() {
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 1000);
  const [allMaterials, setAllMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMaterials = async () => {
      try {
        setLoading(true);

        const trimmedSearch = debouncedSearch.trim();

        const url = trimmedSearch
          ? `http://localhost:5098/api/Materials?query=${encodeURIComponent(
              trimmedSearch
            )}`
          : "http://localhost:5098/api/Materials";

        const response = await fetch(url, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch materials: ${response.status}`);
        }

        const data = await response.json();
        setAllMaterials(Array.isArray(data) ? data : []);
      } catch (error: unknown) {
        if (error instanceof Error && error.name === "AbortError") {
          return;
        }

        console.error("Error fetching materials:", error);
        setAllMaterials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMaterials();

    return () => controller.abort();
  }, [debouncedSearch]);

  

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-3xl font-bold text-[#1f2d4d] sm:text-4xl">
              Find Past Questions
            </h1>

            <p className="mt-3 text-sm leading-6 text-gray-500 sm:text-base">
              Search and download past examination questions by course,
              department, level, semester or year.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by course code, title, department, level, semester or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white py-4 pl-13 pr-5 text-sm text-gray-700 shadow-sm outline-none transition-all placeholder:text-gray-400 hover:border-gray-300 focus:border-[#2f4571] focus:ring-4 focus:ring-[#2f4571]/10"
            />
          </div>

        </div>
   
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className= "rounded-2xl border border-gray-100 bg-white p-6 shadow-sm"
              >
              </div>
            ))}
          </div>
        ) : allMaterials.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {allMaterials.map((material) => (
              <div
                key={material.id}
                className="group flex min-h-87.5 flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2f4571]/20 hover:shadow-xl"
              >               
                <div className="border-b border-gray-100 bg-linear-to-r from-[#2f4571]/5 to-transparent px-6 py-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="rounded-lg bg-[#2f4571] px-3 py-1.5 text-xs font-bold tracking-wide text-white">
                      {material.courseCode}
                    </span>
                  </div>
                </div>
          
                <div className="flex flex-1 flex-col px-6 py-6">
                  <h2 className="mb-5 line-clamp-2 text-lg font-bold  text-[#1f2d4d] transition-colors group-hover:text-[#2f4571]">
                    {material.courseTitle}
                  </h2>

                  <div className="space-y-4">
                    <div className="flex gap-1">
                      <div>
                        <p className="text-[11px] font-medium  text-gray-400">
                          Department
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-gray-700">
                          {material.department}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[11px] font-medium  text-gray-400">
                          Level
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-700">
                          {material.level}
                        </p>
                      </div>

                      <div>
                        <p className="text-[11px] font-medium text-gray-400">
                          Semester
                        </p>
                        <p className="mt-1 text-sm font-semibold text-gray-700">
                          {material.semester}
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[11px] font-medium text-gray-400">
                        Academic Year
                      </p>
                      <p className="mt-1 text-sm font-semibold text-gray-700">
                        {material.year  }
                      </p>
                    </div>
                  </div>

                  <div className="mt-auto pt-6">
                    {material.fileUrl ? (
                      <a
                        href={material.fileUrl}
                        download
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#2f4571] px-4 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#24375c] hover:shadow-md active:scale-[0.98]"
                      >
                        Download Question
                      </a>
                    ) : (
                      <button
                        type="button"
                        disabled
                        className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-100 px-4 py-3 text-sm font-semibold text-gray-400"
                      >
                        File Not Available
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-20 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#2f4571]/10">
            </div>

            <h2 className="text-lg font-bold text-[#1f2d4d]">
              No past questions found
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-400">
              We couldn't find any questions matching your search. Try a
              different course code, department, level, or semester.
            </p>

            {search && (
              <button
                onClick={() => setSearch("")}
                className="mt-6 rounded-xl bg-[#2f4571] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#24375c]"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
}