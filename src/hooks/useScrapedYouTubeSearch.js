import { useState, useCallback } from 'react';

const useScrapedYouTubeSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const search = useCallback(searchterm => {
    const url = `https://www.youtube.com/results?search_query=${encodeURIComponent(searchterm.replaceAll(' ', '+'))}`;
    setLoading(true);
    fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`).then(async res => {
      setLoading(false);
      const t = await res.text();
      const ids = [...new Set(t.match(/(?<=videoId":")([A-Za-z0-9_\-]{11})/g))];
      setResults(ids);
    });
  }, [setLoading, setResults]);

  return [search, results, loading];
};

export default useScrapedYouTubeSearch;
