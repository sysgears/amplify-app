import generate, { templateWriter } from '@larix/generator';
import chalk from 'chalk';
import { spawn } from 'child_process';
import * as path from 'path';
import 'source-map-support/register';

import templates from './templates';

process
  .on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  })
  .on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });

(async () => {
  const { appName } = await generate(templates, templateWriter, 'yarn create @amplify-app', process.argv);

  process.chdir(`./${appName}`);

  const binaryExt = /^win/.test(process.platform) ? '.cmd' : '';
  const amplify = path.join(
    path.dirname(require.resolve('@aws-amplify/cli/package.json')),
    '../../.bin/amplify' + binaryExt
  );

  await new Promise(resolve => {
    const amplifyInit = spawn('node', [amplify, 'init'], { stdio: 'inherit' });
    amplifyInit.on('close', resolve);
  });

  const CODEGEN = '{\
    "generateCode":false\
    }';

  await new Promise(resolve => {
    const amplifyPush = spawn('node', [amplify, 'push', '--codegen', CODEGEN], { stdio: 'inherit' });
    amplifyPush.on('close', resolve);
  });

  console.log(`App ${chalk.green(appName)} generated successfully! Execute commands below to start it:\n`);
  console.log(chalk.yellow(`cd ${appName}`));
  console.log(chalk.yellow(`yarn start`));
})();
