import CardNews from "../../components/cardnews/CardNews";
import CardHotoTo from "../../components/cardnews/CardNews";
import { useState } from "react";
import CardHotTopic from "../../components/cardhottopics/CardHotTopics";
import LinkButtonCategory from "../../components/linkbuttoncategory/LinkButtonCategory";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@mui/material/styles';
import Typography from '@mui/material/Typography';
const Home = () => {
  const [hotTopic, setMockData] = useState([
    {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    }
   
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
    }, {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    }, {
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
    }, {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    }, {
      img: "https://mui.com/static/images/cards/paella.jpg",
      title: "Contoh Title",
      link: "contoh link ke detail",
      time: "2 hour ago",
      source: "CNN Indonesia",
    },
    
   
  ]);

let theme = createTheme({
  typography: {
    fontFamily: 'Fairplay Display',
    fontWeight: 700,
    subtitle1: {
      fontSize: 24,
      lineHeight: 2
    },
    subtitle2: {
      fontSize: 24,
      lineHeight: 2
    },
    body1: {
      fontWeight: 500,
    },
    button: {
      fontStyle: 'italic',
    },
  },
});
theme = responsiveFontSizes(theme);
  return (
    <div id="hot-topic">
      <ThemeProvider theme={theme}>
      <Typography variant="h3">Hot Topic</Typography>
      {
      
      hotTopic.map((item, index) => (
        <CardHotTopic key={index} image={item.img} link={item.link} title={item.title} time={item.time} source={item.source}/>
  ))
  }
    <Typography variant="h3">Latest News</Typography>


  <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 4}}>
      {latestNews.map((item, index) => (
        
        <Grid item xs={12} sm={6} md={3} key={index}>
        <CardNews key={index} image={item.img} link={item.link} title={item.title} time={item.time} source={item.source}/>
  </Grid>
      
        ))}
       </Grid>
    </Box>
      </ThemeProvider>
    </div>
  );
};

export default Home;
