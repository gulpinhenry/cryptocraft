import * as React from 'react';
import { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import '../styles/dashboard.css';

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

import Auth from '../utils/auth';
import { GET_ME } from '../graphql/queries';
import { CryptoProvider } from '../contexts/CryptoContext';
import { useUserContext } from '../contexts/UserContext';

import { mainListItems, secondaryListItems } from '../components/ListItems';
import Graph from '../components/Graph';
import InfoTab from '../components/InfoTab';
import PortfolioTabs from '../components/PortfolioTabs';


function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}

            <Link color="inherit" target="_blank" href="https://github.com/gulpinhenry/cryptocraft">
                cryptocraft
            </Link>{' '}
            {new Date().getFullYear()}.
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
    const [gridType, setGridType] = React.useState('my');
    const toggleDrawer = () => {
        setOpen(!open);
    };
    const logout = (event) => {
        event.preventDefault();
        Auth.logout();
    };
    const handleGridType = (type) => {
        console.log(gridType, 'changed to', type);
        setGridType(type);
    };


    // ============================================================================ //
    //                             //   GET_ME   //                                 //
    // ============================================================================ //
    const { handleuserchange } = useUserContext();

    let un = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);

    if (getme_loading) {
        console.log('Loading username data in Dashboard.js...');
    } else {
        if (!getme_data) {
            console.log(un, 'Falsey \'un\' in Dashboard.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getme_data) {
            un = getme_data.me.username;
            console.log(un, 'Truthy \'un\' in Dashboard.js');
        }
    }
    useEffect(() => {
        handleuserchange(un);
    }, [handleuserchange, un]);
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //


    return (
        <CryptoProvider>
            <ThemeProvider theme={mdTheme}>
                <Box sx={{ display: 'flex' }}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar sx={{ pr: '24px' }}>
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
                        <List>
                            {mainListItems}
                        </List>
                        <Divider />
                        <List>
                            {secondaryListItems()}
                        </List>
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
                                    <Paper
                                        className="graph-paper"
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
                                    <Paper
                                        className="stats-paper"
                                        sx={{
                                            p: 2,
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                    >
                                        <InfoTab gridType={gridType} handleGridType={handleGridType} />
                                    </Paper>
                                </Grid>
                                <Grid item xs={12}>
                                    <PortfolioTabs gridType={gridType} handleGridType={handleGridType} />
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
