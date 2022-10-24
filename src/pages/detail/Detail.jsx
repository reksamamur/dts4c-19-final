import CardDetails from "../../components/carddetails/CardDetails";
import CardHotoTo from "../../components/cardnews/CardNews";
import { useState } from "react";
import CardHotTopic from "../../components/cardhottopics/CardHotTopics";
import LinkButtonCategory from "../../components/linkbuttoncategory/LinkButtonCategory";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { ThemeCreate } from "../../utils/themeprovider/theme-create";
import Typography from "@mui/material/Typography";
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";
const Detail = () => {
  const [selectedTheme, setSelectedTheme] = useState(ThemeCreate);
  const [hotTopic, setMockData] = useState([
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Massa tortor nibh nulla condimentum imperdiet scelerisque...",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
  ]);

  const [detailNews, setDetailtData] = useState([
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
  ]);

  return (
    <ThemeProvider theme={ThemeCreate}>
      <Box sx={{ width: "100%", paddingBottom: "30px" }}>
        <Typography variant="title">Title</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 2 }}>
          {detailNews.map((item, index) => (
            <Grid item xs={12} key={index} mt={5}>
              <CardDetails
                key={index}
                image={item.img}
                link={item.link}
                title={item.title}
                time={item.time}
                source={item.source}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </ThemeProvider>
  );
};

export default Detail;
