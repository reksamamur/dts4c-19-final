import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { NavLink, useNavigate } from "react-router-dom";

import {
  Grid,
  Box,
  Skeleton,
  Typography,
  Button,
  Modal,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import {
  addToDetailNews,
} from "../../store/feature/latestnews/latestNewsSlice";

import Pagination from "../../components/pagination/Pagination";
import CardNews from "../../components/cardnews/CardNews";
import CardHotTopic from "../../components/cardhottopics/CardHotTopics";

import { ThemeCreate } from "../../utils/themeprovider/theme-create";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  py: 1,
  px: 1,
};

const Home = () => {
  const PageSize = 8;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  
  const { isLoading, latestNews, hotTopicNews } = useSelector(
    (store) => store.latestNews
  );

  const { categoryNews } = useSelector((store) => store.categoryNews);

  useEffect(() => {}, []);

  if (isLoading) {
    return (
      <Box>
        <Box sx={{ pt: 10 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Skeleton variant="text" width="40%" sx={{ fontSize: "4rem" }} />
              <Skeleton height="20vh" />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: "flex", gap: 2 }}>
                <Skeleton width="20%" />
                <Skeleton width="20%" />
              </Box>
              <Skeleton variant="text" sx={{ fontSize: "5rem" }} />
            </Grid>
          </Grid>
          {/* <Skeleton />
        <Skeleton width="60%" /> */}
        </Box>
        <Box sx={{ pt: 5 }}>
          <Skeleton width="40%" />
          <Skeleton />
        </Box>
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
      <Box sx={{ paddingBottom: "30px", marginTop: "50px" }}>
        <Typography variant="title">Hot Topic</Typography>
        {hotTopicNews ? (
          <CardHotTopic
            openDetail={() => openDetail(hotTopicNews)}
            image={hotTopicNews.image.large}
            link={hotTopicNews.routeDetail}
            title={hotTopicNews.title}
            time={hotTopicNews.isoDate}
            source={hotTopicNews.link}
            content={hotTopicNews.contentSnippet}
          />
        ) : (
          <></>
        )}
      </Box>

      <Box sx={{ width: "100%", paddingBottom: "30px", }}>
        <Typography variant="title">Category</Typography>
        <Grid
          container
          columnSpacing={{ xs: 4 }}
          sx={{
            overflow: "auto",
            display: "flex",
            width: "100%",
            marginTop: "20px",
          }}
        >
          {categoryNews.map((item, index) => {
            return (
              <Grid item key={index}>
                <Button
                  sx={{
                    color: "black",
                    ":hover": {
                      bgcolor: "#cc000036",
                      color: "white",
                    },
                  }}
                >
                  <NavLink
                    style={{
                      textDecoration: "none",
                      color: "black",
                      fontWeight: "bold",
                    }}
                    to={item.link}
                  >
                    {item.name}
                  </NavLink>
                </Button>
              </Grid>
            );
          })}
        </Grid>
      </Box>

      <Box sx={{ width: "100%", paddingBottom: "30px" }}>
        <Typography variant="title">Latest News</Typography>
        <Grid container columnSpacing={{ xs: 1 }}>
          {latestNews
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
          totalCount={latestNews.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>

    </ThemeProvider>
  );
};

export default Home;
