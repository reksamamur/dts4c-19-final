import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import moment from "moment-timezone";

import {
  Box,
  CardMedia,
  Card,
  CardActionArea,
  Typography,
  Grid,
} from "@mui/material";

const CardNews = ({ image, link, title, time, openDetail }) => {
  const navigate = useNavigate();
  const [timePost, setTimePost] = useState();

  const postTimes = () => {
    let agos = moment(time).fromNow();
    setTimePost(agos);
  };

  useEffect(() => {
    postTimes();
  }, [timePost]);

  return (
    <Card onClick={openDetail} elevation={0}>
      <CardActionArea sx={{ padding: "10px" }}>
        <CardMedia component="img" className="image" image={image} />
        <Typography
          gutterBottom
          variant="h2"
          sx={{
            paddingTop: "10px",
            overflow: "hidden",
            textOverflow: "ellipsis",
            display: "-webkit-box",
            WebkitLineClamp: "2",
            WebkitBoxOrient: "vertical",
          }}
        >
          {title}
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Typography variant="body1" gutterBottom>
            {timePost}
          </Typography>
          <Typography variant="body1" gutterBottom>
            CNN Indonesia
          </Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default CardNews;
