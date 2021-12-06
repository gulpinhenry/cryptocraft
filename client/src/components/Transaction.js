import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Switch from '@mui/material/Switch';


import { useQuery } from '@apollo/client'
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useCryptoContext } from '../utils/CryptoContext';
// import { ADD_PORTFOLIO } from '../utils/mutations';
// add some other query


function Transaction({ open, handleOpen, action }) {
    const { currentTicker, handleTickerChange } = useCryptoContext();
    const [transactionType, setTransactionType] = React.useState(action);
    const handleClickOpen = () => {
        handleOpen(true);
    };

    const handleClose = () => {
        handleOpen(false);
    };
    const handleTransactionType = (event) => {
        setTransactionType(
          event.target.value,
        );
      };
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{action == "buy" ? "Buy" : "Sell"} {currentTicker}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Some random stuff here{currentTicker}
                    </DialogContentText>
                    {/* select which portfolio to buy or choose from */}
                    <Select
                        autoFocus
                        // value={maxWidth}
                        onChange={handleTransactionType}
                        label="Transaction Type"
                        fullWidth
                        inputProps={{
                            name: 'Transaction Type',
                            id: 'Transaction Type',
                        }}
                    >
                        <MenuItem value="buy">Buy</MenuItem>
                        <MenuItem value="sell">Sell</MenuItem>
                    </Select>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Quantity"
                        type="float" //or some number idk
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>{transactionType == "buy" ? "Purchase" : "Sell"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default Transaction;