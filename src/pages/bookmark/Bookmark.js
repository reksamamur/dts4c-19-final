import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { addToDetailNews } from "../../store/feature/latestnews/latestNewsSlice";

import { getBookmarkbyUser } from "../../utils";
import { useAuth } from "../../context/AuthContext";

import Pagination from "../../components/pagination/Pagination";
import CardNews from "../../components/cardnews/CardNews";

import { ThemeCreate } from "../../utils/themeprovider/theme-create";

import {
  Grid,
  Box,
  Skeleton,
  Typography,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

const Bookmark = () => {
  const PageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const { user } = useAuth();

  const [dataBookmark, setBookmarkData] = useState([]);
  const [dataLoading, setDataLoading] = useState(true);

  const dispatch = useDispatch();

  const fetchDataBookmark = async () => {
    setDataLoading(true);
    try {
      const data = await getBookmarkbyUser(user);
      setDataLoading(false);
      setBookmarkData(data);
    } catch (error) {
      setDataLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDataBookmark();
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
        <Typography variant="title">Bookmark</Typography>
        <Grid container columnSpacing={{ xs: 1 }}>
          {dataBookmark
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
          totalCount={dataBookmark.length}
          pageSize={PageSize}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </Box>
    </ThemeProvider>
  );
};

export default Bookmark;
