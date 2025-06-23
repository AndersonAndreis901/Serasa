import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleConsultarClick = () => {
    navigate("/score");
    handleMenuClose();
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#c8e6c9" }}>
      <Toolbar
        sx={{
          justifyContent: "center",
          position: "relative",
        }}
      >
        {/* Menu + Login/Cadastro */}
        <Box
          sx={{
            position: "absolute",
            left: 16,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-controls={open ? "menu-appbar" : undefined}
            aria-haspopup="true"
            onClick={handleMenuOpen}
          >
            <MenuIcon sx={{ color: "#2e7d32" }} />
          </IconButton>

          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem
              onClick={handleConsultarClick}
              sx={{
                fontWeight: "bold",
                color: "#2e7d32",
                "&:hover": {
                  backgroundColor: "#27632a",
                  color: "#fff",
                },
              }}
            >
              Consultar Score
            </MenuItem>
          </Menu>

          <Button
            component={Link}
            to="/login"
            sx={{ color: "#2e7d32", fontWeight: "bold" }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/cadastro"
            sx={{ color: "#2e7d32", fontWeight: "bold" }}
          >
            Cadastro
          </Button>
        </Box>

        {/* LOGO + NOME centralizados */}
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <Box // trocar essa logo do serasa original
            component="img"
            src="/Fotohome.png"
            alt="Logo do site"
            sx={{ height: 60, width: 60, mr: 1 }}
          />
          <Typography variant="h6" sx={{ color: "#2e7d32", fontWeight: "bold" }}>
            ConfiaScore
          </Typography>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
