import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Portfolio from './pages/Portfolio';
import Dashboard from './pages/Dashboard';
import Error from './pages/Error';
import SignUp from './pages/Signup';
import LogIn from './pages/Login';

import { UserProvider } from './contexts/UserContext';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const isLoggedIn = localStorage.getItem('id_token');
  let redirect;

  if (isLoggedIn === null && window.location.pathname !== '/signup') {
    redirect = <Redirect to="/login" />;
  }

  return (
    <ApolloProvider client={client}>
      <UserProvider>
        <Router>
          <div>
            {redirect}
            <Switch>
              <Route exact path="/" component={Dashboard} />
              <Route exact path="/login" component={LogIn} />
              <Route exact path="/signup" component={SignUp} />
              {/* TODO change routing */}
              <Route exact path="/portfolio" component={Portfolio} />
              <Route exact path="/me" component={Dashboard} />
              <Route component={Error} />
            </Switch>
          </div>
        </Router>
      </UserProvider>
    </ApolloProvider>
  );
}

export default App;
