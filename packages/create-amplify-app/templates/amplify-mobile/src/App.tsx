import * as React from 'react';
import AWSAppSyncClient, { AUTH_TYPE, createAppSyncLink, createLinkWithCache } from 'aws-appsync';
import { gql } from 'apollo-boost';
import { ApolloProvider, Query, Mutation } from 'react-apollo';
import { ApolloLink } from 'apollo-link';
import { withClientState } from 'apollo-link-state';

import { Text, View, Button } from 'react-native';

const LOCAL_HELLO = gql`
  query localHello($subject: String) {
    localHello(subject: $subject) @client
  }
`;

const SERVER_HELLO_QUERY = gql`
  query ListSubjects {
    listSubjects {
      items {
        subject
      }
    }
  }
`;

const SERVER_HELLO_MUTATION = gql`
  mutation CreateSubject($input: CreateSubjectInput!) {
    createSubject(input: $input) {
      id
      subject
    }
  }
`;

const createApolloClient = (): any => {
  const stateLink = createLinkWithCache(cache =>
    withClientState({
      cache,
      resolvers: {
        Query: {
          localHello(obj: any, { subject }: { subject: string }) {
            return `Hello, ${subject}! from Mobile UI`;
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
  };

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

const LocalHello = () => (
  <Query query={LOCAL_HELLO} variables={{ subject: 'World' }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Text>'Loading...'</Text>;
      }

      return <Text>Local Salutation: {error ? error.message : data.localHello}</Text>;
    }}
  </Query>
);

const AddItem = () => {
  return (
    <Mutation mutation={SERVER_HELLO_MUTATION} refetchQueries={[{ query: SERVER_HELLO_QUERY }]}>
      {(mutate: any) => {
        const send = () =>
          mutate({
            variables: {
              input: {
                subject: 'Hello, World! from Server'
              }
            }
          });

        return (
          <View>
            <Text>Add item to database:</Text>
            <Button onPress={send} title="Add" />
          </View>
        );
      }}
    </Mutation>
  );
};

const ListItems = () => (
  <Query query={SERVER_HELLO_QUERY} variables={{ subject: 'World' }}>
    {({ loading, error, data }) => {
      if (loading) {
        return <Text>'Loading...'</Text>
      }

      return (
        <View>
            {error
              ? <Text>`${error.message}. You probably don`t have GraphQL Server running at the moment - thats okay`</Text>
              : data.listSubjects.items.map((item: {subject: String}, idx: React.ReactText) => <View key={idx}><Text>{`${idx}. ${item.subject}`}</Text></View>)}
        </View>
      );
    }}
  </Query>
);

const ServerHello = () => (
  <View>
    <AddItem />
    <ListItems />
  </View>
);

interface AppProps {
  exp: any;
}

const App = (props: AppProps) => {

  return (
    <ApolloProvider client={createApolloClient()}>
      <View>
        <Text>Welcome to your own GraphQL mobile front end!</Text>
        <Text>You can start editing source code and see results immediately</Text>
        <LocalHello />
        <ServerHello />
      </View>
    </ApolloProvider>
  );
};

export default App;
