import { createAsyncThunk } from "@reduxjs/toolkit";

import { urlnews, fetchData, getVoted } from "../../../../utils";

const fetchDataNews = createAsyncThunk("latestnews/fetchDataNews", async () => {
  const dataFetch = await fetchData(urlnews);
  const fetchVoted = await getVoted();

  if (fetchVoted) {
    return {
      news: dataFetch,
      hot: fetchVoted,
    };
  }

  return { news: dataFetch, hot: dataFetch[0] };
});

export { fetchDataNews };
