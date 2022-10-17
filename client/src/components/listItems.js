import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
// import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
// import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AssignmentIcon from '@mui/icons-material/Assignment';

// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
// import DialogContent from '@mui/material/DialogContent';
// import DialogContentText from '@mui/material/DialogContentText';
// import DialogTitle from '@mui/material/DialogTitle';
import Link from '@mui/material/Link';

// import { useState } from 'react';
// import { useMutation } from '@apollo/client';
// import { ADD_PORTFOLIO } from '../utils/mutations';


// NOTE!!: mainListItems is for the Dashboard side link, secondaryListItems is for the Portfolio side link.

export const mainListItems = (
    <div>
        {/* dashboard button  */}
        <Link href="/" className="sideLinks">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        {/* leaderboard button  */}
        {/* <ListItem button>
            <ListItemIcon>
                <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Leaderboard" />
        </ListItem> */}
    </div>
);

// map portfolios here
export function secondaryListItems() {
    // const [open, setOpen] = useState(false)
    // const [formState, setFormState] = useState({ name: '' });

    // const [addPortfolio, { error, data }] = useMutation(ADD_PORTFOLIO);

    // const handleChange = (event) => {
    //     const { name, value } = event.target;

    //     setFormState({
    //         ...formState,
    //         [name]: value
    //     });
    // }

    const handleClickOpen = () => {

    };

    // const handleCancel = () => {
    //     setOpen(false);
    // };

    // const handleAdd = async (event) => {
    //     event.preventDefault();
    //     console.log(formState);

    //     try {
    //         const { data } = await addPortfolio({
    //             variables: { ...formState, usdBalance: 1000000 }
    //         })
    //         console.log(data)
    //     } catch (e) {
    //         console.error(e)
    //     }

    //     setFormState({ name: '' });
    //     setOpen(false);
    // }

    return (
        <div>
            <ListSubheader inset>Portfolios</ListSubheader>
            {/* portfolio button  */}
            <Link href="/portfolio" className="sideLinks">
                <ListItem button onClick={handleClickOpen}>
                    <ListItemIcon>
                        <AssignmentIcon />
                    </ListItemIcon>
                    <ListItemText primary="Portfolio" />
                </ListItem>
            </Link>

            {/* <Dialog open={open} onClose={handleCancel}>
                <DialogTitle>Add a new Portfolio</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Congrats, you're a millionaire! We fund each of your portfolios with $1,000,000 to start. 
                        See how different sets of cryptocurrencies perform with each portfolio.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        id="name"
                        label="Portfolio name"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={formState.name}
                        onChange={handleChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleAdd}>Add Portfolio</Button>
                </DialogActions>
            </Dialog> */}
        </div>
    );
}
