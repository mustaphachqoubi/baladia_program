import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import PrintIcon from "@mui/icons-material/Print";
import SendIcon from "@mui/icons-material/Send";
import EmailIcon from "@mui/icons-material/Email";
import { Link, useLocation } from "react-router-dom";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { useForm } from "react-hook-form";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));


const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Navbar = ({ setFormDisplay, formDisplay, setDeleteDisplay, deleteDisplay }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleSearch = (data) => {
    console.log(data)
  }

  const handlePrint = () => {
    window.print()
  }

  const handleFormDisplay = () => {
    formDisplay === "hidden" ? setFormDisplay("flex") : setFormDisplay("hidden")
  }

  const handleDelete = () => {
    deleteDisplay === "hidden" ? setDeleteDisplay("flex") : setDeleteDisplay("hidden")
  }

  const location = useLocation()
 


  const menuId = "primary-search-account-menu";

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <Link to="/depart">
        <MenuItem>
          <IconButton size="large" color="inherit">
            <SendIcon />
          </IconButton>
          <p className="flex justify-center items-center font-bold cursor-pointer">
            Depart
          </p>
        </MenuItem>
      </Link>

      <Link to="/arrivee">
        <MenuItem>
          <IconButton size="large" color="inherit">
            <EmailIcon />
          </IconButton>
          <p className="flex justify-center items-center font-bold cursor-pointer">
            Arrivee
          </p>
        </MenuItem>
      </Link>

      <Link to="/">
        <MenuItem>
          <IconButton size="large" color="inherit">
            <Badge badgeContent={19} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>

          <p className="flex justify-center items-center font-bold cursor-pointer">
            Notifications
          </p>
        </MenuItem>
      </Link>

      {
        location.pathname === "/depart" || location.pathname === "/arrivee" ? (
        <MenuItem onClick={handleDelete}>
          <IconButton size="large" color="inherit">
              <DeleteIcon />
          </IconButton>

          <p className="flex justify-center items-center font-bold cursor-pointer">
            Delete
          </p>
        </MenuItem>
        ) : null
      } 

      <MenuItem onClick={handlePrint}>
        <IconButton size="large" color="inherit">
          <PrintIcon />
        </IconButton>

        <p className="flex justify-center items-center font-bold cursor-pointer">
          Print
        </p>
      </MenuItem>

     {
        location.pathname === "/depart" ? (
        <MenuItem onClick={handleFormDisplay}>
        <IconButton size="large" color="inherit">
          {formDisplay === "flex" ? (<RemoveCircleIcon />) : <AddCircleIcon />}
        </IconButton>

        <p className="flex justify-center items-center font-bold cursor-pointer">
          Add  depart
        </p>
      </MenuItem>
        ) : location.pathname === "/arrivee" ? (
        <MenuItem onClick={handleFormDisplay}>
        <IconButton size="large" color="inherit">
          {formDisplay === "flex" ? (<RemoveCircleIcon />) : <AddCircleIcon />}
        </IconButton>

        <p className="flex justify-center items-center font-bold cursor-pointer">
          Add arrivee
        </p>
      </MenuItem>
        ) : null
      }

    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }} className="dontprint">
      <AppBar position="static">
        
        <Toolbar>
        <div>
          <h1 className="font-bold md:text-2xl">Bureau de order</h1>
        </div>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: "1rem" }}>
            <Link to="/depart">
              <p className={`${location.pathname === "/depart" && "bg-white text-blue-400"} flex justify-center items-center border-2 border-white px-4 py-2 font-bold rounded-md hover:bg-white hover:text-blue-400 cursor-pointer`}>
                Depart
              </p>
            </Link>

            <Link to="/arrivee">
              <p className={`${location.pathname === "/arrivee" && "bg-white text-blue-400"} flex justify-center items-center border-2 border-white px-4 py-2 font-bold rounded-md hover:bg-white hover:text-blue-400 cursor-pointer`}>
                Arrivee
              </p>
            </Link>

            <Link to="/">
              <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
              >
                <Badge badgeContent={""} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Link>

            

            {
        location.pathname === "/depart" || location.pathname === "/arrivee" ? (
        <IconButton
                size="large"
                aria-label="show 17 new notifications"
                color="inherit"
                onClick={handleDelete}
              >
                  <DeleteIcon />
              </IconButton>
        ) : null
      }

            <IconButton
              onClick={handlePrint}
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <PrintIcon />
            </IconButton>

            {
        location.pathname === "/depart" ? (
        <div onClick={handleFormDisplay} className="flex justify-center items-center cursor-pointer">
        <IconButton size="large" color="inherit">
          {formDisplay === "flex" ? (<RemoveCircleIcon />) : <AddCircleIcon />}
        </IconButton>

        <p className="flex justify-center items-center font-bold cursor-pointer">
          Add  depart
        </p>
      </div>
        ) : location.pathname === "/arrivee" ? (
        <div onClick={handleFormDisplay} className="flex justify-center items-center cursor-pointer">
        <IconButton size="large" color="inherit">
          {formDisplay === "flex" ? (<RemoveCircleIcon />) : <AddCircleIcon />}
        </IconButton>

        <p className="flex justify-center items-center font-bold cursor-pointer">
          Add arrivee
        </p>
      </div>
        ) : null
      }

          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }} />
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
    </Box>
  );
};
