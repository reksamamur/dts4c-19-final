import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToDetailNews } from "../../store/feature/latestnews/latestNewsSlice";

import { fetchData } from "../../utils";
import { useState, useEffect, useMemo } from "react";

import Pagination from "../../components/pagination/Pagination";

import CardNews from "../../components/cardnews/CardNews";

import { ThemeCreate } from "../../utils/themeprovider/theme-create";

import { Grid, Box, Skeleton, Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const CategoryFetch = ({ slug, url, name }) => {
  const PageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState([]);
  const [dataLoading, setDataLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchAPI = () => {
    setDataLoading(true);
    fetchData(url)
      .then((res) => {
        setDataLoading(false);
        setData(res);
      })
      .catch((err) => {
        setDataLoading(false);
      });
  };

  useEffect(() => {
    fetchAPI();
  }, []);

  if (dataLoading) {
    return (
      <Box>
        <Box sx={{ pt: 5 }}>
          <Skeleton width="40%" />
          <Skeleton />
        </Box>
      </Box>
    );
  }

  const openDetail = (item) => {
    try {
      dispatch(addToDetailNews(item));
      navigate(item.routeDetail);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ThemeProvider theme={ThemeCreate}>
      <Box sx={{ width: "100%", paddingBottom: "30px" }}>
        <Typography variant="title">Category: {name}</Typography>
        <Grid container columnSpacing={{ xs: 1 }}>
          {data
            .slice(
              (currentPage - 1) * PageSize,
              (currentPage - 1) * PageSize + PageSize
            )
            .map((item, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} mt={5}>
                <CardNews
                  openDetail={() => openDetail(item)}
                  image={item.image.small}
                  link={item.routeDetail}
                  title={item.title}
                  time={item.isoDate}
                  source={item.link}
                />
              </Grid>
            ))}
        </Grid>
      </Box>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Pagination
          currentPage={currentPage}
          totalCount={data.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </ThemeProvider>
  );
};

const Category = () => {
  const searchParams = useParams();
  const { categoryNews } = useSelector((store) => store.categoryNews);

  if (searchParams.type) {
    let find = categoryNews.find((item) => item.slug == searchParams.type);

    return (
      <CategoryFetch slug={find.slug} url={find.urlapi} name={find.name} />
    );
  } else {
    return <h1>Not Found</h1>;
  }
};

export default Category;
