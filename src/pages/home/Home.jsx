import CardNews from "../../components/cardnews/CardNews";
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
const Home = () => {
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

  const [latestNews, setLatestData] = useState([
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
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
      <Box sx={{ paddingBottom: "30px" }}>
        <Typography variant="title">Hot Topic</Typography>

        <div id="hot-topic">
          {hotTopic.map((item, index) => (
            <CardHotTopic
              key={index}
              image={item.img}
              link={item.link}
              title={item.title}
              time={item.time}
              source={item.source}
            />
          ))}
        </div>
      </Box>

      <Box sx={{ width: "100%", paddingBottom: "30px" }}>
        <Typography variant="title">Latest News</Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 4 }}>
          {latestNews.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index} mt={5}>
              <CardNews
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

export default Home;
