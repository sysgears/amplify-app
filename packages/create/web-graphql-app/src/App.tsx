import { gql } from 'apollo-boost';
import * as React from 'react';
import { Query, Mutation } from 'react-apollo';

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

const LocalHello = () => (
  <Query query={LOCAL_HELLO} variables={{ subject: 'World' }}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...';
      }

      return <h2>Local Salutation: {error ? error.message : data.localHello}</h2>;
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
          <section>
            <h2>
              Add item to database: <button onClick={send}>Add</button>
            </h2>
          </section>
        );
      }}
    </Mutation>
  );
};

const ListItems = () => (
  <Query query={SERVER_HELLO_QUERY} variables={{ subject: 'World' }}>
    {({ loading, error, data }) => {
      if (loading) {
        return 'Loading...';
      }

      return (
        <h2>
          {error
            ? error.message + '. You probably don`t have GraphQL Server running at the moment - thats okay'
            : data.listSubjects.items.map((item, idx) => <p key={idx}>{`${idx}. ${item.subject}`}</p>)}
        </h2>
      );
    }}
  </Query>
);

const ServerHello = () => (
  <>
    <AddItem />
    <ListItems />
  </>
);

const App = () => (
  <div>
    <h1>Welcome to your own GraphQL web front end!</h1>
    <h2>You can start editing source code and see results immediately</h2>
    <LocalHello />
    <ServerHello />
  </div>
);

export default App;
