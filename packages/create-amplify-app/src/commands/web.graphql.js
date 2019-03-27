const { spawn } = require('child_process');

(async () => {
  const amplify = require.resolve('@aws-amplify/cli/bin/amplify');

  const CODEGEN = '{\
    "generateCode":false\
    }';

  await new Promise(resolve => {
    const amplifyPush = spawn('node', [amplify, 'push', '--codegen', CODEGEN, '--yes'], { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });
})();
