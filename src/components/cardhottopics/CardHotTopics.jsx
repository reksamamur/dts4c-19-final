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

const CardHotTopic = ({
  image,
  link,
  title,
  time,
  source,
  content,
  openDetail,
}) => {
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ position: "relative" }}>
              <CardMedia component="img" className="image" image={image} />
              <Box
                sx={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: "100%",
                  borderRadius: "0.4rem",
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 69%)",
                  color: "white",
                  padding: "1.5rem",
                }}
              >
                <Typography variant="h1" gutterBottom>
                  {title}
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Typography variant="body1" gutterBottom>
                {timePost}
              </Typography>
              <Typography variant="body1" gutterBottom>
                CNN Indonesia
              </Typography>
            </Box>
            <Typography
              gutterBottom
              variant="desc"
              sx={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: "4",
                WebkitBoxOrient: "vertical",
              }}
            >
              {content}
            </Typography>
          </Grid>
        </Grid>
      </CardActionArea>
    </Card>
  );
};
export default CardHotTopic;