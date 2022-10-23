import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
const CardNews = ({ image, link, title, time }) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(link);
  };

  return (
    <div onClick={openDetail} className="list-content">
      <img src={image} className="image" />

      <Typography gutterBottom variant="h2" sx={{ paddingTop: "20px" }}>
        {title}
      </Typography>

      <div className="card-text">
        <ul className="post-meta">
          <li>
            <span>{time}</span>
          </li>
          <li>
            <span>CNN Indonesia</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CardNews;
