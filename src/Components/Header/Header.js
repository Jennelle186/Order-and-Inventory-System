import React, { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,
  MenuItem,
  Avatar,
  Stack,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import logo from "../../assets/logo.jpg";

import { signOut } from "firebase/auth";
import { auth } from "../../Firebase/utils";
import { useNavigate, Link } from "react-router-dom";

const links = [
  {
    to: "/Dashboard",
    name: "Dashboard",
  },
  {
    to: "/Products",
    name: "Products",
  },
  {
    to: "/Order",
    name: "Orders",
  },
];

const Header = () => {
  //firebase signout
  let navigate = useNavigate();
  const logOut = (aysnc) => {
    signOut(auth)
      .then(() => {
        console.log("logged out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <AppBar
        position="static"
        color="primary"
        style={{ backgroundColor: "#222" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Avatar alt="logo1" src={logo} sx={{ height: 50, width: 50 }} />

            <Box
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
              className="ms-5 "
            >
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
                className="active"
              >
                {links.map((link) => (
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      <Link
                        to={link.to}
                        style={{ textDecoration: "none", color: "black" }}
                      >
                        {link.name}
                      </Link>
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {links.map((link) => (
                <Link to={link.to} style={{ textDecoration: "none" }}>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {link.name}
                  </Button>
                </Link>
              ))}
            </Box>

            <Stack direction="row" justifyContent="end">
              <Button onClick={logOut}>Log out</Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};

export default Header;
