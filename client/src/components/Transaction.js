import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { useQuery, useMutation } from '@apollo/client';
import { useCryptoContext } from '../utils/CryptoContext';

import { GET_ME, GET_PORTFOLIO } from '../utils/queries';
import { BUY_CRYPTO } from '../utils/mutations';



function Transaction({ open, handleOpen, action, price }) {
    const { currentticker } = useCryptoContext();

    const [transactionType, setTransactionType] = React.useState(action);
    const [amount, setAmount] = React.useState(0);
    const [ptf, setPtf] = React.useState('portfolio1');

    // ============================================================================ //
    //  ORDER OF OPERATIONS MUST GO:  GET_ME => GET_PORTFOLIO => BUY_CRYPTO         //
    // ============================================================================ //

    // ============================================================================ //
    //                             //   GET_ME   //                                 //
    // ============================================================================ //
    let un = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    const { loading: getme_loading, data: getme_data } = useQuery(GET_ME);

    if (getme_loading) {
        console.log('Loading username data in Transaction.js...');
    } else {
        if (!getme_data) {
            console.log(un, 'Falsey \'un\' in Transaction.js. Should never get here.'); // Delete this (if) once working to increase performance
        } else if (getme_data) {
            un = getme_data.me.username;
            console.log(un, 'Truthy \'un\' in Transaction.js');
            // SHOULD HAVE QUIT HERE???
        }
    }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // ============================================================================ //
    //                         //   GET_PORTFOLIO   //                              //
    // ============================================================================ //

    // let curUSDbalance = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    // let curCryptos = [{ __typename: 'Crypto', ticker: 'BTC', quantity: 9.99999 }, { __typename: 'Crypto', ticker: 'ETH', quantity: 9.99999 }]; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    // const { loading: getPortfolio_loading, data: getPortfolio_data } = useQuery(GET_PORTFOLIO, { variables: { name: un } });

    // if (getPortfolio_loading) {
    //     console.log('Loading portfolio data in Transaction.js...');
    // } else {
    //     if (!getPortfolio_data) {
    //         console.log(curUSDbalance, 'Falsey \'curUSDbalance\' in Transaction.js. Should never get here.'); // Delete this (if) once working to increase performance
    //     // } else if (getPortfolio_data?.getPortfolio?.usdBalance && getPortfolio_data?.getPortfolio?.cryptos) {
    //     } else if (getPortfolio_data) {
    //         curUSDbalance = getPortfolio_data.getPortfolio.usdBalance;
    //         curCryptos = getPortfolio_data.getPortfolio.cryptos;
    //         console.log(curCryptos, 'Truthy \'curCryptos\' in Transaction.js');
    //         console.log(curUSDbalance, 'Truthy \'curUSDbalance\' in Transaction.js');
    //         // SHOULD HAVE QUIT HERE???
    //     }
    // }
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

    // OLD VERSION OF THE GET_PORTFOLIO CHECK. KEEP TO REFERENCE IF PIECES ARE NEEDED FOR NOW. 
    // THERE IS BUG WITH THE NEW VERSION WHEN DISPLAYING AMOUNTS IN THE BUY MODAL...................
    const { loading: getPortfolio_loading, data: getPortfolio_data } = useQuery(GET_PORTFOLIO, { variables: { name: un } });
    let curUSDbalance = 'Loading...'; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    let curCryptos = [{ __typename: 'Crypto', ticker: 'BTC', quantity: 9.99999 }, { __typename: 'Crypto', ticker: 'ETH', quantity: 9.99999 }]; // Init variable for holding. Prevents crashing due to null values if the query is too slow.
    if (getPortfolio_data) {
        curUSDbalance = getPortfolio_data.getPortfolio.usdBalance;
        curCryptos = getPortfolio_data.getPortfolio.cryptos;
    }
    // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ //


    // ============================================================================ //
    //                            //   BUY_CRYPTO   //                              //
    // ============================================================================ //
    const [buyCrypto] = useMutation(BUY_CRYPTO);


    // BUY FUNCTIONS
    let total = amount / price;
    // console.log(price);
    const handleClose = () => {
        handleOpen(false);
    };

    const handleTransactionType = (event) => {
        setTransactionType(event.target.value);
    };

    const handleAmountChange = (event) => {
        setAmount(event.target.value);
        total = amount / price;
    };

    const handlePtfChange = (event) => {
        setPtf(event.target.value);
    };

    const handleSubmit = (event) => {
        if (transactionType === 'buy') {
            handleBuy(event);
        } else {
            handleSell(event);
        }
    };

    const handleBuy = async (event) => {
        event.preventDefault();
        console.log('buy');
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
                investment: amount,
            },
        });
        console.log('purchase successful');
        // maybe give user feedback
        handleClose();
        window.location.reload();

        return mutationResponse;
    };

    const handleSell = async (event) => {
        event.preventDefault();
        console.log('sell');

        // check to see if the sell is valid, traverse through map to see if i have it
        let sum = 0;
        curCryptos.forEach((element) => {
            if (element.ticker === currentticker) {
                sum += element.quantity;
            }
        });
        if (sum >= total) {
            const mutationResponse = await buyCrypto({
                variables: {
                    name: un,
                    ticker: currentticker,
                    quantity: (total * -1),
                    investment: (amount * -1).toString(),
                },
            });
            // add feedback of sell successful
            console.log('sell successful');
            // maybe give user feedback
            handleClose();
            window.location.reload();
            return mutationResponse;
        } else {
            alert(`You don't have enough ${currentticker}!`);
            return;
        }
    };
    // @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@ //

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
                            type="number" //or some number idk, figure out how to replace it when you click on it
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
                    <Button onClick={handleSubmit}>{transactionType === 'buy' ? 'Purchase' : 'Sell'}</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


export default Transaction;
