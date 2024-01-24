import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";

function Navbar({currUser, handleLogout }) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const [category, setCategory] = React.useState("");

  let menu;
  if (currUser.loggedIn) {
    menu = <>
            <Button
              onClick={() => navigate("/post")}
              sx={{ my: 2, color: "black", display: 'block', mr: 3 }}
              style={{ fontSize: 15, fontWeight: 700 }}
            >
              New Post
            </Button>
            
            <Box sx={{ flexGrow: 0, mr:24 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0}}>
                  <Avatar />
              </IconButton>
              <Menu
                sx={{ mt: '45px', ml: 3 }}
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem disabled>
                  <Avatar sx={{width: 32, height: 32, ml: -0.5, mr: 1 }} />
                  {currUser.user.username}
                </MenuItem>
                <Divider style={{ background: "black" }}/>
                <MenuItem onClick={() => { navigate("/"); handleLogout();}}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </Box>
          </>;
  } else {
    menu = <>
            <Button
              onClick={() => navigate("/signup")}
              sx={{ my: 2, color: 'black', display: 'block', mr: 3 }}
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              Sign Up
            </Button>
            <Button
              onClick={() => navigate("/login")}
              sx={{ my: 2, color: 'black', display: 'block', mr: 23 }}
              style={{ fontSize: 15, fontWeight: 600 }}
            >
              Login
            </Button>
            <Menu
                style={{opacity: 0}}
                anchorEl={anchorElUser}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              ></Menu>
           </>;
  }

  return (
    <AppBar position="static" elevation={0} style={{ background: "#eeeeee" }}>
      <Container maxWidth="xl" sx={{color: 'black'}}>
        <Toolbar disableGutters>
          <ForumRoundedIcon sx={{ display: { xs: 'none', md: 'flex' }, ml: 24 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              ml: 1,
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'black',
              textDecoration: 'none',
            }}
          >
            Forum
          </Typography>

          <TextField
            id="search-bar"
            name="category"
            className="text ms-4"
            variant="outlined"
            placeholder="Search..."
            size="small"
            required
            onChange={(event) => setCategory(event.target.value)}
            style={{width: 165}}
          />
          <Link to={`/posts/${category}`}>
            <IconButton>
              <SearchIcon style={{ fill: "black" }} />
            </IconButton>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}></Box>
              
          {menu}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
