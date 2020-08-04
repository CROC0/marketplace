import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloLink,
  NormalizedCacheObject,
} from '@apollo/client';

const httpLink: ApolloLink = createHttpLink({
  uri: 'http://localhost:4000/',
});

const authLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }
  return forward(operation);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {},
      },
    },
  }),
});

export default client;
