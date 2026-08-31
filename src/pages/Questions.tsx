import { useEffect, useState } from "react";

interface Material {
  id: number;
  title: string;
  courseCode: string;
  department: string;
  level: string;
  semester: string;
  year?: number;
  status: "Uploaded" | "Downloaded" | "Available";
  fileUrl?: string;
}

export default function Questions() {
  const [search, setSearch] = useState("");
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5098/api/Materials")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch materials");
        }

        return response.json();
      })

      .then((data) => {
  console.log("API DATA:", data);
  setMaterials(data);
})

      .catch((error) => {
        console.error("Error fetching materials:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

 const filteredMaterials = materials.filter((material) =>
  [
    material.title,
    material.courseCode,
    material.department,
    material.level,
    material.semester,
    material.year,
  ].some((field) =>
    String(field ?? "").toLowerCase().includes(search.toLowerCase())
  )
);
  

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">

       <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-[#2f4571] md:text-4xl">
          Questions
        </h1>

        <p className="text-base text-gray-500">
          Search all the available Past Questions
        </p>
      </div>

   
      <div className="relative mb-8 w-full">
        <input
          type="text"
          placeholder="Search by course code, title, department, level or year..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-gray-200 bg-white px-5 py-4 text-sm text-gray-700 outline-none focus:border-[#2f4571]"
        />
      </div>

    
      {loading ? (
        <div className="py-16 text-center">
          <p className="text-gray-500">
            Loading past questions...
          </p>
        </div>
      ) : filteredMaterials.length > 0 ? (

       
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {filteredMaterials.map((material) => (
            <div
              key={material.id}
              className="flex min-h-82.5 flex-col rounded-2xl border bg-white p-6"
            >

            
              <div className="mb-5 flex items-start justify-between gap-3">

                <span className="rounded-lg bg-[#2f4571]/10 px-3 py-1.5 text-sm font-bold text-[#2f4571]">
                  {material.courseCode}
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-medium ${
                    material.status === "Available"
                      ? "bg-green-100 text-green-700"
                      : material.status === "Downloaded"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {material.status}
                </span>

              </div>

              
              <h3 className="mb-5 text-lg font-semibold leading-6 text-gray-800">
                {material.title}
              </h3>

              
              <div className="space-y-3 text-sm text-gray-500">

                <p>
                  <span className="font-semibold text-gray-700">
                    Department:
                  </span>{" "}
                  {material.department}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Level:
                  </span>{" "}
                  {material.level}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Semester:
                  </span>{" "}
                  {material.semester}
                </p>

                <p>
                  <span className="font-semibold text-gray-700">
                    Year:
                  </span>{" "}
                  {material.year}
                </p>

              </div>

             
              <div className="mt-auto pt-6">

                {material.fileUrl ? (
                  <a
                    href={material.fileUrl}
                    download
                    className="block w-full rounded-lg bg-[#2f4571] px-4 py-3 text-center font-medium text-white transition hover:bg-[#24375c]"
                  >
                    Download
                  </a>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-lg bg-gray-300 px-4 py-3 font-medium text-gray-500"
                  >
                    File Not Available
                  </button>
                )}

              </div>

            </div>
          ))}

        </div>

      ) : (

       
        <div className="rounded-xl bg-white py-16 text-center shadow-sm">

          <p className="text-gray-500">
            No Past Questions found.
          </p>

          <p className="mt-1 text-sm text-gray-400">
            Try searching for another course code, department or year.
          </p>

        </div>
      )}

    </div>
  );
}