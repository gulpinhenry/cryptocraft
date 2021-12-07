import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $firstName: String!, $lastName: String!, $password: String!) {
        addUser(username: $username, firstName: $firstName, lastName: $lastName, password: $password) {
            token
            user {
                _id
                username
            }
        }
    }
`;

// export const ADD_PORTFOLIO = gql`
//     mutation addPortfolio($name: String, $usdBalance: Float!) {
//         addPortfolio(name: $name, usdBalance: $usdBalance) {
//             name
//             usdBalance
//         }
//     }
// `;

export const ADD_PORTFOLIO = gql`
    mutation addPortfolio($name: String, $usdBalance: Float!) {
        addPortfolio(name: $name, usdBalance: $usdBalance) {
            name
            usdBalance
        }
    }
`;

export const UPDATE_BALANCE = gql`
    mutation updateBalance($name: String!) {
        updateBalance(name: $name) {
            historicalBalance
        }
    }
`;


export const BUY_CRYPTO = gql`
    mutation buyCrypto($name: String!, $ticker: String!, $quantity: Float!, $investment: String!) {
        buyCrypto(name: $name, ticker: $ticker, quantity: $quantity, investment: $investment) {
            cryptos {
                ticker
                quantity
            }
        }
    }
`;