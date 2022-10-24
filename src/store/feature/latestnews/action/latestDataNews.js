const latestDataNews = (data) => {
  const resData = data.map((item) => {
    const titleConvert = item.link.substring(item.link.lastIndexOf("/") + 1);
    return {
      ...item,
      slug: titleConvert,
      routeDetail: `/detail/${titleConvert}`,
    };
  });
  return resData;
};

export { latestDataNews };
