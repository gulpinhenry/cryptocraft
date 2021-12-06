import '../styles/dashboard.css';

import * as React from 'react';
import { CryptoProvider } from '../utils/CryptoContext';
import { GET_CRYPTOINFO, GET_CRYPTOCANDLES } from '../utils/queries';
import { UPDATE_BALANCE } from '../utils/mutations'
import { useQuery, useMutation } from '@apollo/client'
import Auth from '../utils/auth';


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import List from '@mui/material/List';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import { mainListItems } from '../components/listItems';
import CryptoGrid from '../components/CryptoGrid';
import Graph from '../components/Graph';
import InfoTab from '../components/InfoTab';
import SecondaryListItems from '../components/listItems';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}

            <Link color="inherit" target="_blank" href="https://github.com/gulpinhenry/cryptocraft">
                cryptocraft
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function PortfolioContent() {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    }

    // const [updateBalance, { error }] = useMutation(UPDATE_BALANCE);

    // try {
    //     const { data } = addComment(UPDATE_BALANCE,{
    //       variables: {
    //         name: Auth.getProfile().data.username,
    //       },
    //     });
    //     console.log(data);
    //     } catch (err) {
    //     console.error(err);
    //   }
    // };


    const { loading, data } = useMutation(UPDATE_BALANCE, {
        variables: { name: 't' }
    });
    let info = 'Loading UB...';
    if (loading) {
        console.log('loading info tab..');
    } else {
        info = data;
        console.log(info);
    }




    return (
        <CryptoProvider>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px',
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && { display: 'none' }),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{ flexGrow: 1 }}
                            >
                                Portfolio
                            </Typography>
                            <IconButton color="inherit" onClick={logout}>
                                <Badge color="secondary">
                                    <LogoutIcon />
                                </Badge>
                            </IconButton>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List>{mainListItems}</List>
                        <Divider />
                        <List>{SecondaryListItems()}</List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                            <Grid container spacing={3}>
                                {/* Chart */}
                                <Grid item xs={12} md={8} lg={9}>
                                    <Paper className="graph-paper"
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <Graph />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12} md={4} lg={3}>
                                    <Paper className="stats-paper"
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <InfoTab />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <Paper id="dashboard-table-container" sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                        <CryptoGrid />
                                    </Paper>
                                </Grid>
                            </Grid>
                            <Copyright sx={{ pt: 4 }} />
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </CryptoProvider>
    );
}

export default function Portfolio() {
    return <PortfolioContent />;
}