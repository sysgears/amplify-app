import { spawn } from 'child_process';

const initWebRest = async amplify => {
  process.chdir(`./amplify/backend/function/rest/src`);

  await new Promise(resolve => {
    const amplifyPush = spawn('yarn', { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });

  await new Promise(resolve => {
    const amplifyPush = spawn('node', [amplify, 'push', '--yes'], { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });
};

export default initWebRest;
