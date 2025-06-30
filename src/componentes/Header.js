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
import { useAuth } from "../servicos/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const [accountAnchorEl, setAccountAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const accountMenuOpen = Boolean(accountAnchorEl);

  const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const handleAccountMenuOpen = (event) => setAccountAnchorEl(event.currentTarget);
  const handleAccountMenuClose = () => setAccountAnchorEl(null);

  const handleConsultarClick = () => {
    navigate("/score");
    handleMenuClose();
  };

  const handleContaClick = () => {
    navigate("/conta");
    handleAccountMenuClose();
  };

  const handleLogout = () => {
    logout();
    handleAccountMenuClose();
    navigate("/");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "#c8e6c9" }}>
      <Toolbar sx={{ justifyContent: "center", position: "relative" }}>
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
            onClick={handleMenuOpen}
          >
            <MenuIcon sx={{ color: "#2e7d32" }} />
          </IconButton>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            transformOrigin={{ vertical: "top", horizontal: "left" }}
          >
            <MenuItem
              onClick={handleConsultarClick}
              sx={{
                fontWeight: "bold",
                color: "#2e7d32",
                "&:hover": { backgroundColor: "#27632a", color: "#fff" },
              }}
            >
              Consultar Score
            </MenuItem>
          </Menu>

          {!user ? (
            <>
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
            </>
          ) : (
            <>
              <Button
                sx={{ color: "#2e7d32", fontWeight: "bold" }}
                onClick={handleAccountMenuOpen}
              >
                Conta
              </Button>
              <Menu
                anchorEl={accountAnchorEl}
                open={accountMenuOpen}
                onClose={handleAccountMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem
                  onClick={handleContaClick}
                  sx={{
                    fontWeight: "bold",
                    color: "#2e7d32",
                    "&:hover": { backgroundColor: "#27632a", color: "#fff" },
                  }}
                >
                  Informações da Conta
                </MenuItem>
                <MenuItem
                  onClick={handleLogout}
                  sx={{
                    fontWeight: "bold",
                    color: "#2e7d32",
                    "&:hover": { backgroundColor: "#27632a", color: "#fff" },
                  }}
                >
                  Sair
                </MenuItem>
              </Menu>
            </>
          )}
        </Box>

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
          <Box
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
