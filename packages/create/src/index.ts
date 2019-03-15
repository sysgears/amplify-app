import generate, { templateWriter } from '@larix/generator';
import { spawn } from 'child_process';
import chalk from 'chalk';
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
  
  const AMPLIFY = "{\
    \"projectName\":\"headlessProjectName\",\
    \"envName\":\"myenvname\",\
    \"defaultEditor\":\"code\"\
    }"

  const REACTCONFIG="{\
    \"SourceDir\":\"src\",\
    \"DistributionDir\":\"build\",\
    \"BuildCommand\":\"npm run-script build\",\
    \"StartCommand\":\"npm run-script start\"\
    }"

  const FRONTEND=`{\
    \"frontend\":\"javascript\",\
    \"framework\":\"react\",\
    \"config\": ${REACTCONFIG}
    }`
  await new Promise(resolve => {
    const amplify = spawn('amplify', ['init', '--amplify', AMPLIFY, '--frontend', FRONTEND], { stdio: 'inherit' });
    amplify.on('close', resolve);
  });

  console.log(`App ${chalk.green(appName)} generated successfully! Execute commands below to start it:\n`);
  console.log(chalk.yellow(`cd ${appName}`));
  console.log(chalk.yellow(`yarn start`));
  
})();
