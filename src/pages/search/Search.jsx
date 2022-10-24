import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import {
  searchNews,
  addToDetailNews,
} from "../../store/feature/latestnews/latestNewsSlice";

import Pagination from "../../components/pagination/Pagination";
import CardHotTopic from "../../components/cardhottopics/CardHotTopics";
import LinkButtonCategory from "../../components/linkbuttoncategory/LinkButtonCategory";
import CardNews from "../../components/cardnews/CardNews";
import CardHotoTo from "../../components/cardnews/CardNews";

import {
  replaceString,
  replaceWhitespaceString,
  replaceDashString,
} from "../../utils";

import { ThemeCreate } from "../../utils/themeprovider/theme-create";

import { Grid, Box, Typography } from "@mui/material";

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

const Search = () => {
  const PageSize = 8;

  const searchParams = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [nSearch, setNSearch] = useState("");
  const [pathSearch, setPathSearch] = useState("");

  const { searchNewsRes, isLoading } = useSelector((store) => store.latestNews);

  useEffect(() => {
    if (!isLoading) {
      dispatch(searchNews({ search: searchParams.keyword }));
    }
  }, [isLoading]);

  if (!searchParams.keyword) return (
    <Typography variant="title">
      No Keyword
    </Typography>
  );

  const onSearchChange = (value) => {
    setNSearch(value);
    let cSearch = replaceString(value);
    let pSearch = replaceWhitespaceString(cSearch);

    setPathSearch(pSearch);
  };

  const onSearchEnter = (event) => {
    if (event.key === "Enter") {
      let keySearch = replaceDashString(pathSearch);

      dispatch(searchNews({ search: keySearch }));
      navigate(`/search/${pathSearch}`, { replace: true });
    }
  };

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
        <Typography variant="title">
          Search Result: {searchParams.keyword}
        </Typography>

        <Grid container columnSpacing={{ xs: 1 }}>
          {searchNewsRes
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

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pagination
            currentPage={currentPage}
            totalCount={searchNewsRes.length}
            pageSize={PageSize}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Search;
