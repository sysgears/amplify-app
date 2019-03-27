import generate, { templateWriter } from '@larix/generator';
import chalk from 'chalk';
import { spawn } from 'child_process';
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
  const { appName, templateId } = await generate(templates, templateWriter, 'yarn create @amplify-app', process.argv);
  process.chdir(`./${appName}`);

  const amplify = require.resolve('@aws-amplify/cli/bin/amplify');

  await new Promise(resolve => {
    const amplifyInit = spawn('node', [amplify, 'init'], { stdio: 'inherit' });
    amplifyInit.on('close', resolve);
  });

  await new Promise(resolve => {
    const amplifyPush = spawn(
      'node',
      [`${templateId.includes('graphql') ? '../src/commands/web.graphql.js' : '../src/commands/web.rest.js'}`],
      { stdio: 'inherit' }
    );
    amplifyPush.on('close', resolve);
  });

  console.log(`App ${chalk.green(appName)} generated successfully! Execute commands below to start it:\n`);
  console.log(chalk.yellow(`cd ${appName}`));
  console.log(chalk.yellow(`yarn start`));
})();
