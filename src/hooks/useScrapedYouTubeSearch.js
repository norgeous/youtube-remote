import { useState, useCallback } from 'react';

const useScrapedYouTubeSearch = () => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const search = useCallback(searchterm => {
    const encodedSearch = encodeURIComponent(searchterm.replaceAll(' ', '+'));
    const url = `https://www.youtube.com/results?search_query=${encodedSearch}`;
    setLoading(true);
    fetch(`https://api.codetabs.com/v1/proxy/?quest=${url}`).then(async res => {
      setLoading(false);
      const t = await res.text();
      const ids = [...new Set(t.match(/(?<=videoId":")([A-Za-z0-9_\-]{11})/g))];
      setResults(ids);

      const ytInitialDataStr = t.match(/(?<=var ytInitialData = )(.*)(?=;)/)[0];
      console.log({ ytInitialDataStr });
      const ytInitialData = JSON.parse(ytInitialDataStr);
      console.log({ ytInitialData });
      const { contents } = ytInitialData.contents.twoColumnSearchResultsRenderer.primaryContents.sectionListRenderer;
      console.log({ contents });
    });
  }, [setLoading, setResults]);

  return [search, results, loading];
};

export default useScrapedYouTubeSearch;
