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
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ForumRoundedIcon from '@mui/icons-material/ForumRounded';
import { grey } from '@mui/material/colors';

import { useNavigate } from 'react-router-dom';

const settings = ['Logout'];

function Navbar({currUser}) {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
            
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, mr: 24 }}>
                  <Avatar src="/broken-image.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', ml: 3 }}
                id="menu-appbar"
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
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
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

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          </Box>

          {menu}
          
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
