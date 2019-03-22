const { spawn, exec } = require('child_process');

process.chdir(`./my-app`);

exec('sudo yarn install -g @aws-amplify/cli');

// const pause = t => new Promise(resolve => setTimeout(resolve, t));

// const ls = spawn('amplify', ['add', 'api']);

// ls.stdout.on('data', data => {
//   console.log('data-->', data.toString());

//   if (data.toString().includes('Please select from one of the below mentioned services')) {
//     ls.stdin.write('\n');
//   }

//   if (data.toString().includes('Provide API name')) {
//     ls.stdin.write('graphql\n');
//   }

//   if (data.toString().includes('Choose an authorization')) {
//     ls.stdin.write('\n');
//   }

//   if (data.toString().includes('Do you have an annotated GraphQL schema')) {
//     ls.stdin.write('Yes\n');
//   }

//   // if (data.toString().includes('Provide your schema file path')) {
//   //   ls.stdin.write('./example.graphql\n');
//   // }

//   // if (data.toString().includes('What best describes your project')) {
//   //   ls.stdin.write('\n');
// });
