import { useState, type MouseEvent } from "react";
import { AppBar, Toolbar, Box, IconButton, Menu, MenuItem } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate, useLocation, Link } from "react-router-dom";
import logo from "../assets/logo 4.png";
import dashboardLogo from "../assets/secondlogo.png";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const isDashboard = location.pathname === "/dashboard";
  const currentLogo = isDashboard ? dashboardLogo : logo;

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
        bgcolor: isDashboard ? "#1f3c88" : "#ffffff",
        color: isDashboard ? "#ffffff" : "#1f3c88",
        transition: "0.3s",
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
      
          <Box component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            }}
            >
              <img
               src={currentLogo}
               alt="PastQuest"
               style={{
                 height: isDashboard ? 120 : 100,
                objectFit: "contain",
               }}
  />
</Box>
          
          <div className="hidden items-center gap-10 md:flex">
            <nav className="flex items-center gap-8">
              <button
                onClick={() =>
                  navigate(isDashboard ? "/" : "/dashboard")
                }
                className={`font-semibold transition ${
                  isDashboard
                    ? "text-white hover:text-blue-200"
                    : "text-[#223A72] hover:text-blue-700"
                }`}
              >
                {isDashboard ? "Home" : "Dashboard"}
              </button>

              <button
                onClick={() => navigate("/login")}
                className={`font-semibold transition ${
                  isDashboard
                    ? "text-white hover:text-blue-200"
                    : "text-[#223A72] hover:text-blue-700"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => navigate("/signup")}
                className={`rounded-xl px-6 py-2 font-semibold transition ${
                  isDashboard
                    ? "bg-white text-[#1f3c88] hover:bg-gray-100"
                    : "bg-[#1f4fb8] text-white hover:bg-[#153d93]"
                }`}
              >
                Sign Up
              </button>
            </nav>
          </div>


          <div className="md:hidden">
            <IconButton
              onClick={handleOpenMenu}
              sx={{ color: isDashboard ? "#fff" : "#1f3c88" }}
            >
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
                navigate(isDashboard ? "/" : "/dashboard");
                handleCloseMenu();
              }}
            >
              {isDashboard ? "Home" : "Dashboard"}
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