import SearchIcon from "@mui/icons-material/Search";

import { useState, useEffect } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import StyledMenu from "../../dropdownmenu/DropDownMenu";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
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
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 700,
    bgcolor: "background.paper",

    boxShadow: 24,
    borderRadius: "4px",
    p: 0,
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
        <Modal
          open={openSearch}
          onClose={handleClose}
          aria-labelledby="parent-modal-title"
          aria-describedby="parent-modal-description"
        >
          <Box sx={{ ...style, width: "50%" }}>
            <FormControl sx={{ width: "100%" }}>
              <OutlinedInput placeholder="Search" />
            </FormControl>
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
