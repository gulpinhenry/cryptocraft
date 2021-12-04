import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';
import { withRouter } from 'react-router';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://github.com/gulpinhenry/cryptocraft">
                cryptocraft
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const LogIn = (props) => {
    const [formState, setFormState] = useState({ 
        username: '', password: '' 
    });
    const [login, { error, data }] = useMutation(LOGIN_USER);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        // const data = new FormData(event.currentTarget);
        // // eslint-disable-next-line no-console
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        // });
        console.log(formState);
        try {
            const { data } = await login({
                variables: { ...formState }
            })

            console.log(data)

            Auth.login(data.login.token)
        } catch (e) {
            console.error(e)
        }

        setFormState({
            username: '',
            password: ''
        })
    };

    const divStyle = {
        backgroundColor: 'rgb(202, 102, 122)',
        borderRadius: '3px',
        color: 'white',
        textAlign: 'center'
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Log in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoFocus
                            value={formState.username}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Link href="/signup" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                        {error && (
                            <div className="my-3 p-1" style={divStyle}>
                                {error.message}
                            </div>
                        )}
                    </Box>
                </Box>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}

export default LogIn;