import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import ButtonBase from "@mui/material/ButtonBase";
const CardHotTopic = ({ image, link, title, time, source }) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(link);
  };

  return (
    <div onClick={openDetail}>
      <Grid container spacing={4} sx={{ paddingTop: "30px" }}>
        <Grid item xs={12} md={8}>
          <div className="card">
            <img alt={title} src={image} className="image" />
            <div className="img-overlay">
              <Typography variant="h1" gutterBottom>
                {title}
              </Typography>
              <div className="card-text">
                <ul className="post-meta">
                  <li>
                    <span>{time}</span>
                  </li>
                  <li>
                    <span>{source}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography gutterBottom variant="desc">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
            quam ducimus neque odit labore eos vero doloremque architecto
            similique vitae. Fuga corporis beatae qui pariatur sit suscipit
            aspernatur, quaerat quia!
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
};
export default CardHotTopic;
