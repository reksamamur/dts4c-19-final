import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Unstable_Grid2';
const CardNews = ({ image, link, title, time }) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(link);
  };

  return (
    
  <div onClick={openDetail}>
      
      <img src={image} />
      <p>{time}</p>
    </div>

    
  );
};

export default CardNews;
