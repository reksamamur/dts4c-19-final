import { typenews, urlnews } from "../../../../utils";

const initCategoryNews = typenews.map((item) => {
  return {
    slug: item.slug,
    name: item.name,
    urlapi: `${urlnews}${item.slug}`,
    link: `/category/${item.slug}`,
  };
});

export { initCategoryNews };
