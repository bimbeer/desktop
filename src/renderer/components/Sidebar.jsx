import { styled, ThemeProvider, createTheme } from '@mui/material/styles';
import * as React from 'react';
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
import { Link } from '@chakra-ui/react';
import { Avatar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from '../context/AuthContext';
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

export default function MiniDrawer() {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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
                <img src={beer} alt="beer logo" width="40px" />
              </ListItemIcon>
              <ListItemText
                primary="Bimbeer"
                primaryTypographyProps={{
                  sx: {
                    fontWeight: 'medium',
                    fontSize: '2rem',
                    paddingLeft: '15px',
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
          <Divider />
          <List>
            {['Dashboard', 'Pairs', 'Messages', 'Profile', 'Logout'].map(
              (text, index) => (
                <ListItem disablePadding key={text} sx={{ paddingBottom: 1 }}>
                  <ListItemButton
                    component={Link}
                    to={
                      text === 'Logout' ? undefined : `/#/${text.toLowerCase()}`
                    }
                    onClick={text === 'Logout' ? handleLogout : undefined}
                  >
                    <ListItemIcon
                      sx={{
                        paddingLeft: 1.5,
                        paddingRight: 5,
                        // color: '#d4af37',
                      }}
                    >
                      {index === 0 && <DashboardOutlinedIcon />}
                      {index === 1 && <Diversity1Icon />}
                      {index === 2 && <ChatBubbleOutlineOutlinedIcon />}
                      {index === 3 && <AccountCircleOutlinedIcon />}
                      {index === 4 && <LogoutIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              )
            )}
          </List>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 2.5, pb: 2, display: 'flex', alignItems: 'center' }}>
            <Avatar
              alt={user && user.email}
              sx={{ width: 40, height: 40 }}
              style={{ backgroundColor: '#d4af37' }}
            />
            {open && (
              <Typography variant="body2" sx={{ ml: 2 }}>
                {user && user.email}
              </Typography>
            )}
          </Box>
        </Drawer>
      </Box>
    </ThemeProvider>
  );
}
