import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledMenu from "../../dropdownmenu/DropDownMenu";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl, { useFormControl } from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const open = anchorEl;

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setOpenSearch(false);
  };

  const handleToggle = () => {
    setOpenSearch(!openSearch);
  };

  return (
    <header>
      <div className="navbar">
        <div>
          <span>News</span> Portal
        </div>
        <div className="nav-item">
          <SearchIcon onClick={handleToggle} />
          <MenuIcon
            id="basic-button"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          />
        </div>
        <StyledMenu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          <MenuItem onClick={handleClose}>Sign In </MenuItem>
          <MenuItem onClick={handleClose}>Sign Up</MenuItem>
          <MenuItem onClick={handleClose}>Bookmark</MenuItem>
          <MenuItem onClick={handleClose}>Sign Out</MenuItem>
        </StyledMenu>
        <Backdrop
          sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openSearch}
          onClick={handleClose}
        >
          <Box component="form" noValidate autoComplete="off">
            <FormControl sx={{ width: "25ch" }}>
              <OutlinedInput placeholder="Search" />
            </FormControl>
          </Box>
        </Backdrop>
      </div>
    </header>
  );
};

export default Header;
