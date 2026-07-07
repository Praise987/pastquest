import { useState, type MouseEvent } from "react";
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo 4.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        bgcolor: "#ffffff",
        color: "#1f3c88",
      }}
    >
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div
            className="flex items-center p-2 cursor-pointer"
          >
            <img src={logo}className="block w-44 p-3" />
          </div>

          <div className="hidden items-center gap-120 md:flex">
           <nav className="flex items-center gap-8">
  <button
    onClick={() =>
      navigate(location.pathname === "/dashboard" ? "/" : "/dashboard")
    }
    className="font-semibold text-[#223A72] transition hover:text-blue-700"
  >
    {location.pathname === "/dashboard" ? "Home" : "Dashboard"}
  </button>
</nav>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-[#223A72] hover:text-blue-700"
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className="rounded-xl bg-[#1f4fb8] px-6 py-2 font-semibold text-white transition hover:bg-[#153d93]"
              >
                Sign Up
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <IconButton onClick={handleOpenMenu}>
              <MenuIcon />
            </IconButton>
          </div>

          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
          <MenuItem
  onClick={() => {
    navigate(location.pathname === "/dashboard" ? "/" : "/dashboard");
    handleCloseMenu();
  }}
>
  {location.pathname === "/dashboard" ? "Home" : "Dashboard"}
</MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/login");
                handleCloseMenu();
              }}
            >
              Login
            </MenuItem>

            <MenuItem
              onClick={() => {
                navigate("/signup");
                handleCloseMenu();
              }}
            >
              Sign Up
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}