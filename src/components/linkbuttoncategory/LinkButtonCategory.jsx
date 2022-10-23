import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { BrowserRouter, HashRouter, Routes, Route } from "react-router-dom";
import Paper from '@mui/material/Paper';
import { Link as RouterLink, MemoryRouter } from 'react-router-dom';
import { StaticRouter } from 'react-router-dom/server';
import ButtonBase from '@mui/material/ButtonBase';
import PropTypes from 'prop-types';
const LinkButtonCategory = ({ name, link}) => {
    const navigate = useNavigate();
  
    const openDetail = () => {
      navigate(link);
    };
   

    const LinkBehavior = React.forwardRef((props, ref) => (
        <RouterLink ref={ref} to="/material-ui/getting-started/installation/" {...props} />
      ));
      
      function Router(props) {
        const { children } = props;
        if (typeof window === 'undefined') {
          return <StaticRouter location="/">{children}</StaticRouter>;
        }
      
        return <MemoryRouter>{children}</MemoryRouter>;
      }
      
      Router.propTypes = {
        children: PropTypes.node,
      };
return (
    <Box sx={{ typography: 'body1' }}>
    <Router>
      <Link component={RouterLink} to="/">
        With prop forwarding
      </Link>
      <br />
      <Link component={LinkBehavior}>Without prop forwarding</Link>
    </Router>
  </Box>
  );
};
  export default LinkButtonCategory;