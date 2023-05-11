import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import Diversity1Icon from '@mui/icons-material/Diversity1';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import { useLocation, useNavigate, Link } from 'react-router-dom';

import { getUserData } from 'renderer/services/profiles';
import {
  getUserFromLocalStorage,
  UserAuth,
} from 'renderer/context/AuthContext';
import { Avatar } from '@mui/material';
import beer from '../assets/images/beer.png';

const drawerWidth = 294;
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },

  typography: {
    fontFamily: 'Poppins',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(10)} + 1px)`,
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

export default function Sidebar() {
  const [profileData, setProfileData] = useState({
    avatar: '',
  });
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    localStorage.removeItem('avatar');
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const getBorderColor = (item) => {
    if (item.to && location.pathname.startsWith(item.to)) {
      return '#d4af37';
    }

    if (item.text === 'Messages' && location.pathname.startsWith('/messages')) {
      return '#d4af37';
    }

    return 'inherit';
  };

  const getHoverBorderColor = (item) => {
    if (item.to && location.pathname.startsWith(item.to)) {
      return '#d69e2e';
    }

    if (item.text === 'Messages' && location.pathname.startsWith('/messages')) {
      return '#d69e2e';
    }
    return '#252525';
  };

  useEffect(() => {
    const currentUserId = getUserFromLocalStorage();

    async function fetchData() {
      const storedAvatar = localStorage.getItem('avatar');

      if (storedAvatar) {
        setProfileData((prevState) => ({ ...prevState, avatar: storedAvatar }));
      } else {
        const userData = await getUserData(currentUserId);

        if (userData) {
          setProfileData(userData);
          localStorage.setItem('avatar', userData.avatar);
        }
      }
    }
    fetchData();
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          open={open}
          onMouseEnter={handleDrawerOpen}
          onMouseLeave={handleDrawerClose}
        >
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon
                sx={{ paddingLeft: 1, paddingBottom: 1, paddingTop: 1 }}
              >
                <Link to="/dashboard">
                  <img src={beer} alt="beer logo" width="40px" />
                </Link>
              </ListItemIcon>
              <Link to="/dashboard">
                <ListItemText
                  primary="Bimbeer"
                  primaryTypographyProps={{
                    sx: {
                      fontSize: '2rem',
                      fontFamily: 'Pacifico',
                      paddingLeft: '15px',
                      paddingTop: '0px',
                    },
                  }}
                />
              </Link>
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            {[
              { text: 'Dashboard', to: '/dashboard' },
              { text: 'Beer buddies', to: '/matches' },
              { text: 'Messages', to: '/messages/undefined' },
              { text: 'Profile', to: '/profile' },
              { text: 'Logout', to: undefined },
            ].map((item) => (
              <ListItem
                disablePadding
                key={item.text}
                sx={{ paddingBottom: 1 }}
              >
                <ListItemButton
                  component={Link}
                  to={item.to}
                  onClick={item.text === 'Logout' ? handleLogout : undefined}
                  sx={{
                    borderLeft: `4px solid ${getBorderColor(item, location)}`,
                    '&:hover': {
                      borderLeft: `4px solid ${getHoverBorderColor(
                        item,
                        location
                      )}`,
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      paddingLeft:
                        (item.to && location.pathname.startsWith(item.to)) ||
                        (item.text === 'Messages' &&
                          location.pathname.startsWith('/messages'))
                          ? 0.75 - 0.25
                          : 1,
                      paddingRight: 5,
                    }}
                  >
                    {item.text === 'Dashboard' && <DashboardOutlinedIcon />}
                    {item.text === 'Beer buddies' && <Diversity1Icon />}
                    {item.text === 'Messages' && (
                      <ChatBubbleOutlineOutlinedIcon />
                    )}
                    {item.text === 'Profile' && <AccountCircleOutlinedIcon />}
                    {item.text === 'Logout' && <LogoutIcon />}
                  </ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 2.5, pb: 2, display: 'flex', alignItems: 'center' }}>
            <Link to="/profile">
              <Avatar
                alt="User avatar"
                sx={{ width: 40, height: 40 }}
                style={{ backgroundColor: '#d4af37' }}
                src={profileData.avatar}
              />
            </Link>
            {open && (
              <Link to="/profile">
                <Typography variant="body2" sx={{ ml: 2 }}>
                  {user.email}
                </Typography>
              </Link>
            )}
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
