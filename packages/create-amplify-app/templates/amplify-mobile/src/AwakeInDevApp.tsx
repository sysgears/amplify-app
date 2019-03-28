import * as Expo from 'expo';
import React from 'react';
import { View } from 'react-native';
import App from './App';

interface AwakeInDevAppProps {
  exp: any;
}

interface AwakeInDevAppState {
  isReady: boolean;
}

// we don't want this to require transformation
class AwakeInDevApp extends React.Component<AwakeInDevAppProps, AwakeInDevAppState> {
  constructor(props: AwakeInDevAppProps) {
    super(props);
    this.state = { isReady: false };
  }

  public async componentDidMount() {
    this.setState({ isReady: true });
  }

  public render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }

    return React.createElement(
      View,
      {
        style: {
          flex: 1,
          marginTop: Expo.Constants.statusBarHeight
        }
      },
      React.createElement(App, this.props),
      React.createElement(process.env.NODE_ENV === 'development' ? Expo.KeepAwake : View)
    );
  }
}

Expo.registerRootComponent(AwakeInDevApp);
