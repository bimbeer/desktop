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
import { Avatar } from '@material-ui/core';
import { doc, getDoc } from 'firebase/firestore';
import {
  getUserFromLocalStorage,
  UserAuth,
} from 'renderer/context/AuthContext';
import { db } from '../firebase/firebase';
import beer from '../assets/images/beer.png';

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

const drawerWidth = 294;

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
    navigate('/');
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const userId = getUserFromLocalStorage();
    const docRef = doc(db, 'profile', userId);

    async function fetchData() {
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfileData(docSnap.data());
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
              { text: 'Matches', to: '/matches' },
              { text: 'Messages', to: '/messages' },
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
                    backgroundColor:
                      item.to && location.pathname.replace('#', '') === item.to
                        ? '#d4af37'
                        : 'inherit',
                    '&:hover': {
                      backgroundColor:
                        item.to &&
                        location.pathname.replace('#', '') === item.to
                          ? '#d69e2e'
                          : '#252525',
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      paddingLeft: 1.5,
                      paddingRight: 5,
                    }}
                  >
                    {item.text === 'Dashboard' && <DashboardOutlinedIcon />}
                    {item.text === 'Matches' && <Diversity1Icon />}
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
                alt={user.email}
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
