const filterDataNews = (data, search) => {
  let result = data.latestNews.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );
  return result;
};

export { filterDataNews };
