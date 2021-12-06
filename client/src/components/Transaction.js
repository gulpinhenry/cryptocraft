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


function Transaction({ open, handleOpen, action, price }) {
    const { currentTicker, handleTickerChange } = useCryptoContext();
    const [transactionType, setTransactionType] = React.useState(action);
    const [amount, setAmount] = React.useState(0);
    const [ptf, setPtf] = React.useState("portfolio1");
    let total = amount/price;
    console.log(price);
    const handleClose = () => {
        handleOpen(false);
    };
    const handleTransactionType = (event) => {
        setTransactionType(
            event.target.value,
        );
    };
    const handleAmountChange = (event) => {
        setAmount(
            event.target.value,
        );
        total = amount/price;
   
    }
    const handlePtfChange = (event) => {
        setPtf(
            event.target.value,
        );
    }
    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Trade {currentTicker}</DialogTitle>
                <DialogContent>

                    <Box
                        noValidate
                        component="form"
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            m: 'auto',
                            width: 'fit-content',
                        }}
                    >
                        <DialogContentText>
                            Portfolio
                        </DialogContentText>
                        {/* select which portfolio to buy or choose from */}
                        <Select
                            autoFocus
                            value={ptf}
                            onChange={handlePtfChange}
                            label="Portfolio"
                            fullWidth
                            inputProps={{
                                name: 'ptf',
                                id: 'ptf',
                            }}
                        >
                            <MenuItem value="Portfolio 1">portfolio 1</MenuItem>
                            {/* list other ones here */}
                        </Select>
                        <DialogContentText>
                            Transaction Type
                        </DialogContentText>
                        <Select
                            value={transactionType}
                            onChange={handleTransactionType}
                            label="Transaction Type"
                            fullWidth
                            inputProps={{
                                name: 'transactionType',
                                id: 'transactionType',
                            }}
                        >
                            <MenuItem value="buy">Buy</MenuItem>
                            <MenuItem value="sell">Sell</MenuItem>
                        </Select>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="$"
                            type="number" //or some number idk, figure out how to replace it when you click onit
                            fullWidth
                            required={true}
                            defaultValue="0.00"
                            variant="standard"
                            onChange={handleAmountChange}
                        />
                        <DialogContentText>
                            {total} {currentTicker}
                        </DialogContentText>
                    </Box>
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