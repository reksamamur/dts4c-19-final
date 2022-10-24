export const addDatatoDetailNews = (state, payload) => {
  state.listDetailNews.push(payload);

  state.listDetailNews = state.listDetailNews.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.slug === value.slug)
  );

  return state.listDetailNews;
};
