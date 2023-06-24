import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { useTheme } from "@mui/material";
import { useContext } from "react";

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import CartSummary from './CartSummary';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";

import { ColorModeContext, tokens } from "../../theme";

const pages = ['Home', 'About', 'Cart'];

function ResponsiveNavBar(props) {
  const navigate  = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);

  const handleNavigate = function(page){
    navigate(`/${page}`);
  }

  const location = useLocation();
  return (    

    
    <AppBar position="static">
    
      <Box 
      display="flex" 
      borderRadius="3px"
      backgroundColor={colors.blueAccent[400]}
      >
        <Toolbar disableGutters borderRadius="3px" >
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            🎁🛒
          </Typography>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            🎁
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={()=>{handleNavigate(page)}}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Box display="flex" m="2px" borderRadius="3px">
             {location.pathname!=='/About' &&  <CartSummary cartState={props.cartState}/>}
          </Box>
          <Box display="flex" sx={{ flexGrow: 0 }}>
            <IconButton onClick={colorMode.toggleColorMode}>
              {theme.palette.mode === 'dark' ? (
                <DarkModeOutlinedIcon/> 
              ):(
                <LightModeOutlinedIcon/> 
              )}
            </IconButton>  
          </Box>
        </Toolbar>
        </Box>
      
    </AppBar>
  );
}
export default ResponsiveNavBar;
