import { useNavigate } from "react-router-dom";
import Typography from '@mui/material/Typography';
const CardNews = ({ image, link, title, time }) => {
  const navigate = useNavigate();

  const openDetail = () => {
    navigate(link);
  };

  return (
    
  <div onClick={openDetail}>
      
      <img src={image} className="image"/>
      
    <Typography variant="h5" >{title}</Typography>
      
    <div class="card-text">
                    <ul class="post-meta d-flex mb-0">
                      <li className="post-date"><i className="uil uil-calendar-alt"></i><span>{time}</span></li>
                      <li className="post-author"><i className="uil uil-user"></i><span>CNN Indonesia</span></li>
                    </ul>
                  </div>
            
    </div>

    
  );
};

export default CardNews;
