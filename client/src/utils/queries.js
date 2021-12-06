import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
        }
    }
`;

export const GET_PORTFOLIO = gql`
    query getPortfolio ($name: String) {
        getPortfolio (name: $name) {
            name
            usdBalance
            cryptos {
                ticker
                quantity
            }
        }
    }
`;

export const GET_CRYPTOINFO = gql`
    query cryptoData {
        cryptoData {
            cryptoInfo
        }
    }
`;

export const GET_CRYPTOCANDLES = gql`
    query cryptoCandles ($pair: String) {
        cryptoCandles(pair: $pair) {
            cryptoInfo
        }
    }
`;

export const GET_CRYPTODETAILS = gql`
    query cryptoDetails ($pair : String) { 
        cryptoDetails(pair: $pair) {
            cryptoInfo
        }
    }
`;