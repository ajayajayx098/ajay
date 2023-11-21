import { useState } from "react";
import { useRouter } from "next/router";

const SearchResults = () => {
  const router = useRouter();
  const { results } = router.query;

  if (!results) {
    return <div>No results found</div>;
  }

  const searchResults = JSON.parse(results);

  const [keyword, setKeyword] = useState("");
  const [filteredResults, setFilteredResults] = useState([]);
  const [probability, setProbability] = useState(0);

  const handleKeywordSearch = () => {
    const keywordLower = keyword.toLowerCase();
    const filtered = searchResults.filter((result) => {
      const titleLower = result.title.toLowerCase();
      const keywordIndex = titleLower.indexOf(keywordLower);

      if (keywordIndex !== -1) {
        return true;
      }

      const wordsInBetween = titleLower
        .substring(0, keywordIndex)
        .split(' ')
        .filter((word) => word.length > 0);

      if (wordsInBetween.includes('some') || wordsInBetween.includes('other')) {
        return true;
      }

      return false;
    });

    setFilteredResults(filtered);
    const keywordOccurrences = filtered.length;
    const totalResults = searchResults.length;
    const calculatedProbability =
      totalResults > 0 ? keywordOccurrences / totalResults : 0;

    setProbability(calculatedProbability*100);
  };

  return (
    <div className="bg-yellow-100">
      <h1>Search Results</h1>

      <div>
        <label>
          Enter keyword:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </label>
        <button onClick={handleKeywordSearch}>Search</button>
      </div>

      <h2>Filtered Results:</h2>
      <ul>
        {filteredResults.length > 0 ? (
          filteredResults.map((result, index) => (
            <li key={index}>
              <strong>{result.title}</strong>
              <ul>
                {result.headlines.map((headline, idx) => (
                  <li key={idx}>{headline}</li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <p>No results match the keyword.</p>
        )}
      </ul>

      <p>Probability of the keyword: {probability}</p>
    </div>
  );
};

export default SearchResults;