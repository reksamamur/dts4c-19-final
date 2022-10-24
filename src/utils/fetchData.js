export const fetchData = async (url) => {
  const response = await fetch(url);
  try {
    const result = await response.json();

    const resultComp = result.data.map((item) => {
      const titleConvert = item.link.substring(item.link.lastIndexOf("/") + 1);

      return {
        ...item,
        slug: titleConvert,
        routeDetail: `/detail/${titleConvert}`,
      };
    });

    return resultComp;
  } catch (error) {
    console.log(error);
  }
};
