import { useState } from "react";
import { Outlet, useNavigate, NavLink } from "react-router-dom";

import { useAuth } from "../../../context/AuthContext";

import { useDispatch, useSelector } from "react-redux";
import {
  fetchDataNews,
  searchNews
} from "../../../store/feature/latestnews/latestNewsSlice";
import { openSearch } from "../../../store/feature/searchmodal/searchModalSlice";

import {
  Search,
  Menu as MenuIcon,
  Logout,
  Bookmark,
} from "@mui/icons-material";

import {
  Box,
  Menu,
  MenuItem,
  AppBar,
  Toolbar,
  CssBaseline,
  IconButton,
  ListItemIcon,
  Modal,
  FormControl,
  OutlinedInput,
} from "@mui/material";

import {
  replaceString,
  replaceWhitespaceString,
  replaceDashString,
} from "../../../utils";

const Header = () => {
  const { logOut, user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isOpen } = useSelector((store) => store.searchModal);

  const [nSearch, setNSearch] = useState("");
  const [pathSearch, setPathSearch] = useState("");

  const handleLogout = async () => {
    try {
      await logOut();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const updateHotPage = () => {
    dispatch(openSearch(false));
    return dispatch(fetchDataNews());
  };

  const [anchorel, setAnchorEl] = useState(false);
  const open = Boolean(anchorel);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleToggle = () => {
    dispatch(openSearch(true));
  };

  const onSearchChange = (value) => {
    setNSearch(value);
    let cSearch = replaceString(value);
    let pSearch = replaceWhitespaceString(cSearch);

    setPathSearch(pSearch);
  };

  const onSearchEnter = (event) => {
    if (event.key === "Enter") {
      let keySearch = replaceDashString(pathSearch);
      dispatch(searchNews({ search: keySearch }));
      navigate(`/search/${pathSearch}`, { replace: true });
      return dispatch(openSearch(false));
    }
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
    <div>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={0}
        color="transparent"
        sx={{ backdropFilter: "blur(10px)", marginTop: 5 }}
      >
        <Toolbar disableGutters>
          <Box sx={{ display: { sm: "block", flexGrow: 1 } }}>
            <NavLink
              onClick={updateHotPage}
              to={"/"}
              replace={true}
              style={{
                textDecoration: "none",
                color: "black",
                fontWeight: "bold",
              }}
            >
              <span className="logo-news">CNN News</span>Portal
            </NavLink>
          </Box>
          <Box
            sx={{
              display: "flex",
              gap: 2,
            }}
          >
            <IconButton
              onClick={handleToggle}
              sx={{
                color: "black",
                padding: 2,
              }}
            >
              <Search />
            </IconButton>
            <Box>
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  color: "black",
                  padding: 2,
                }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="basic-menu"
                anchorEl={anchorel}
                open={open}
                onClose={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <Box sx={{ width: 300, maxWidth: "100%" }}>
                  {!user ? (
                    <>
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        to={"/signin"}
                      >
                        <MenuItem onClick={handleClose}>Sign in</MenuItem>
                      </NavLink>

                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        to={"/signup"}
                      >
                        <MenuItem onClick={handleClose}>Sign up</MenuItem>
                      </NavLink>
                    </>
                  ) : (
                    <></>
                  )}

                  {user ? (
                    <>
                      <NavLink
                        style={{
                          textDecoration: "none",
                          color: "black",
                          fontWeight: "bold",
                        }}
                        to={"/bookmark"}
                      >
                        <MenuItem onClick={handleClose}>
                          <ListItemIcon>
                            <Bookmark fontSize="small" />
                          </ListItemIcon>
                          Bookmark
                        </MenuItem>
                      </NavLink>

                      <MenuItem
                        onClick={handleLogout}
                        sx={{
                          color: "#CD2525",
                          fontWeight: "bold",
                          ":hover": {
                            bgcolor: "#FFAFAF",
                            color: "CD2525",
                          },
                        }}
                      >
                        <ListItemIcon>
                          <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                      </MenuItem>
                    </>
                  ) : (
                    <></>
                  )}
                </Box>
              </Menu>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Modal open={isOpen} onClose={() => dispatch(openSearch(false))}>
        <Box sx={{ ...style, borderRadius: 2 }}>
          <FormControl sx={{ width: "100%" }}>
            <OutlinedInput
              sx={{
                fontFamily: "Roboto",
              }}
              value={nSearch}
              onKeyDown={(e) => onSearchEnter(e)}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Enter to search!"
            />
          </FormControl>
        </Box>
      </Modal>

      <Outlet />
    </div>
  );
};

export default Header;
