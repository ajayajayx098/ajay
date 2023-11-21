// pages/index.js (Home component)
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import "tailwindcss/tailwind.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const router = useRouter();

  const handleSearch = async () => {
    try {
      const response = await axios.post("/api/search", { query: searchQuery });
      setSearchResults(response.data);
      router.push({
        pathname: "/probability",
        query: { results: JSON.stringify(response.data) },
      });
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="max-w-[1800px] mx-auto mt-10 p-6 bg-gray-100 bg-color">
      <h1 className="text-3xl font-bold mb-4 txt text-red-500">Fake news detection</h1>
      <div className="mb-4 flex">
        <label className="block text-sm font-medium text-gray-600">
          Search Query:
          <input
            className="m-4 p-1 border border-gray-600 rounded-md"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </label>
        <button
          className="mt-3 m-3 p-2 px-10 bg-blue-500 text-white rounded-md bg-red-500"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Search Results:</h2>
          <ul>
            {searchResults.map((result, index) => (
              <li key={index} className="mb-4">
                <strong className="text-lg font-semibold">
                  {result.title}
                </strong>
                <ul className="list-disc ml-4">
                  {result.headlines.map((headline, idx) => (
                    <li key={idx}>{headline}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}