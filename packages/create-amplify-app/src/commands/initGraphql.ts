import { spawn } from 'child_process';

const CODEGEN = '{\
    "generateCode":false\
    }';

const initWebGraphql = async amplify => {
  await new Promise(resolve => {
    const amplifyPush = spawn('node', [amplify, 'push', '--codegen', CODEGEN, '--yes'], { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });
};

export default initWebGraphql;
