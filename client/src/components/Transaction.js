import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

// import FormControl from '@mui/material/FormControl';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
// import Switch from '@mui/material/Switch';


import { useQuery } from '@apollo/client'
// import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useCryptoContext } from '../utils/CryptoContext';

import { GET_PORTFOLIO, GET_ME } from '../utils/queries';
import { BUY_CRYPTO } from '../utils/mutations';

function Transaction({ open, handleOpen, action, price }) {
    const { currentticker } = useCryptoContext();
    // const { currentticker, handletickerchange } = useCryptoContext(); // possibly need handletickerchange

    const [transactionType, setTransactionType] = React.useState(action);
    const [amount, setAmount] = React.useState(0);
    const [ptf, setPtf] = React.useState("portfolio1");

    const [buyCrypto] = useMutation(BUY_CRYPTO);
    // sell crypto add the mutation 

    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);

    let un; //checks username -> profile username

    if (getme_data) {
        un = getme_data.me.username;
        // console.log(un)
    }

    // Grabs portfolio data
    const { data } = useQuery(GET_PORTFOLIO, {
        variables: { name: un }
    });
    let curUSDbalance;
    let curCryptos;

    if (data) {
        curUSDbalance = data.getPortfolio.usdBalance;
        curCryptos = data.getPortfolio.cryptos;
        // console.log(curCryptos)
    }
    //



    // BUY FUNCTIONS
    let total = amount / price;
    // console.log(price);
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

        total = amount / price;

    }

    const handlePtfChange = (event) => {
        setPtf(
            event.target.value,
        );
    }

    const handleSubmit = (event) => {
        if(transactionType == "buy"){
            handleBuy(event);
        }
        else{
            handleSell(event);
        }
    }

    const handleBuy = async (event) => {
        event.preventDefault();
        console.log("buy");
        if (amount > curUSDbalance) {
            alert("You don't have enough money!");
            return;
        }

        console.log(curCryptos);
        
        const mutationResponse = await buyCrypto({
            variables: {
                name: un,
                ticker: currentticker,
                quantity: total,
                investment: amount
            }
        })
        console.log("purchase successful");
        // maybe give user feedback
        handleClose();
        return mutationResponse;
    }

    const handleSell = async (event) => {
        event.preventDefault();
        console.log("sell");
       
        // check to see if the sell is valid, traverse through map to see if i have it
        let sum = 0;
        curCryptos.forEach(element => {
            if(element.ticker == currentticker){
                sum+=element.quantity;
            }
        });
        if(sum>=total){
            const mutationResponse = await buyCrypto({
                variables: {
                    name: un,
                    ticker: currentticker,
                    quantity: (total*-1),
                    investment: (amount*-1).toString()
                }
            })
            // add feedback of sell successful
            handleClose();
            return mutationResponse;
        }
        else{
            alert("Not enough " + currentticker +"!");
            return;
        }
        // create the mutation
        
        // window.location.reload(); // change to state so new USD balance renders dynamically
        // return mutationResponse;
        

    }

    return (
        <div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Trade {currentticker}</DialogTitle>
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
                            {total} {currentticker}
                        </DialogContentText>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSubmit}>{transactionType === "buy" ? "Purchase" : "Sell"}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default Transaction;