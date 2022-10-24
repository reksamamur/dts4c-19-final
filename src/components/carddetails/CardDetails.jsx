import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ShareIcon from "@mui/icons-material/Share";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Box from "@mui/material/Box";
const CardDetails = ({ image, link, title, time }) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(link);
  };

  return (
    <div onClick={openDetail} className="list-content">
      <img src={image} className="image" style={{ maxHeight: "500px" }} />

      <Typography gutterBottom variant="h2" sx={{ paddingTop: "20px" }}>
        {title}
      </Typography>

      <div className="card-text flex">
        <ul className="post-meta">
          <li>
            <span>{time}</span>
          </li>
          <li>
            <span>CNN Indonesia</span>
          </li>
        </ul>
        <div className="social-icon">
          <ul>
            <li>
              <StarOutlineIcon />
            </li>
            <li>
              <ShareIcon />
            </li>
            <li>
              <ThumbUpOffAltIcon />
            </li>
          </ul>
        </div>
      </div>
      <Box sx={{ width: "100%", paddingTop: "30px" }}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore maxime
        harum dolor cumque debitis esse suscipit delectus deserunt ex aut
        laboriosam, nostrum eum a culpa, nam libero. Vero, ad ratione.
      </Box>
    </div>
  );
};

export default CardDetails;
