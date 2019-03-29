import { getTemplateFilePaths, Template } from '@larix/generator';

const templates: Template[] = [
  {
    title: '@amplify-web-graphql: TypeScript, Amplify (GraphQL), React web app',
    files: getTemplateFilePaths(__dirname + '/../templates/amplify-web')
  },
  {
    title: '@amplify-web-rest: TypeScript, Amplify (REST), React web app',
    files: getTemplateFilePaths(__dirname + '/../templates/amplify-web-rest')
  },
  {
    title: '@amplify-mobile-graphql: TypeScript, Amplify (GraphQL), React Native for mobile',
    files: getTemplateFilePaths(__dirname + '/../templates/amplify-mobile')
  },
  {
    title: '@amplify-mobile-rest: TypeScript, Amplify (REST), React Native for mobile',
    files: getTemplateFilePaths(__dirname + '/../templates/amplify-mobile-rest')
  }
];

export default templates;
