import { gql } from '@apollo/client';

export const GET_ME = gql`
    query me {
        me {
            _id
            username
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