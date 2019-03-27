const { spawn } = require('child_process');

(async () => {
  const amplify = require.resolve('@aws-amplify/cli/bin/amplify');

  process.chdir(`./amplify/backend/function/rest/src`);

  await new Promise(resolve => {
    const amplifyPush = spawn('yarn', { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });

  await new Promise(resolve => {
    const amplifyPush = spawn('node', [amplify, 'push', '--yes'], { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });
})();
