import React from 'react';
import { API } from 'aws-amplify';
import { Text, View } from 'react-native';

// tslint:disable-next-line
interface ServerHelloProps {
}

interface ServerHelloState {
  isLoading: boolean;
  error: string;
  data: { message: string };
}

class ServerHello extends React.Component<ServerHelloProps> {
  public state: ServerHelloState = { isLoading: true, data: null, error: null };

  constructor(props: ServerHelloProps) {
    super(props);
  }

  public async componentDidMount() {
    try {
      const result = await API.get('rest', '/hello?subject=World', {});

      this.setState({
        isLoading: false,
        data: result
      });
    } catch (e) {
      this.setState({
        isLoading: false,
        error: e.message
      });
    }
  }

  public render() {

    if (this.state.isLoading) {
      return <Text>Loading...</Text>;
    }

    return (
      <Text>
        Server Salutation:&nbsp;
        {this.state.error
          ? this.state.error + '. You probably don`t have REST API Server running at the moment - thats okay'
          : this.state.data.message}
      </Text>
    );
  }
}

interface AppProps {
  exp: any;
}

const App = (props: AppProps) => {

  return (
    <View>
      <Text>Welcome to your own REST mobile front end!</Text>
      <Text>You can start editing source code and see results immediately</Text>
      <ServerHello />
    </View>
  );
};

export default App;
