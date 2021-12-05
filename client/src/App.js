import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Portfolios from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import SignUp from './pages/Signup';
import LogIn from './pages/Login';

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = localStorage.getItem('id_token');
  let redirect;

  if (isLoggedIn === null && window.location.pathname !== '/signup') {
    redirect = <Redirect to='/login'/>
  }

  return (
    <ApolloProvider client={client}>
      <Router>
        <div>
          {redirect}
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/me" component={Dashboard} />
            <Route component={Error} />
          </Switch>
        </div>
      </Router>
    </ApolloProvider >
  );
}

export default App;
