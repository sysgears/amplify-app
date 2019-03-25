import * as React from 'react';
import Amplify from 'aws-amplify';
import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink, createLinkWithCache } from 'aws-appsync';
import { ApolloProvider } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';
import { render } from 'react-dom';

import App from './App';

import aws_config from './aws-exports';

Amplify.configure(aws_config);

const createApolloClient = () => {
  const stateLink = createLinkWithCache(cache =>
    withClientState({
      cache,
      resolvers: {
        Query: {
          localHello(obj: any, { subject }: { subject: string }) {
            return `Hello, ${subject}! from Web UI`;
          }
        }
      }
    })
  );

  const commonConfig = {
    auth: {
      type: AUTH_TYPE.API_KEY,
      apiKey: aws_config.aws_appsync_apiKey
    },
    region: aws_config.aws_appsync_region,
    url: aws_config.aws_appsync_graphqlEndpoint
  }

  const appSyncLink = createAppSyncLink({
    ...commonConfig,
    complexObjectsCredentials: () => null
  });

  const link = ApolloLink.from([stateLink, appSyncLink]);

  return new AWSAppSyncClient(
    {
      ...commonConfig,
      disableOffline: true
    },
    { link }
  );
};

render(
  <ApolloProvider client={createApolloClient()}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
