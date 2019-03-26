import * as React from 'react';
import { render } from 'react-dom';
import Amplify from 'aws-amplify';
import App from './App';

import aws_config from './aws-exports';

Amplify.configure(aws_config);

render(<App />, document.getElementById('root'));
