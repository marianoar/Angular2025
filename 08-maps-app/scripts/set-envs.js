
//$ npm i -D dotenv
//para ejecutarlo : node ./scripts/set-envs.js -> si está set el commando en el package.json eject npm run set-envs

const { writeFileSync, mkdirSync } = require('fs');

require('dotenv').config();

const targetPath = './src/environments/environment.ts';
const targetPathDev = './src/environments/environment.development.ts';

const mapBoxKey = process.env['MAPBOX_KEY'];
if(!mapBoxKey){
  throw new Error('MAPBOX_KEY is not set')
}

const envFileContent=`
  export const environment = {
    mapBoxKey: "${mapBoxKey}"};
`;

mkdirSync('./src/environments', {recursive: true});
writeFileSync(targetPath, envFileContent);
writeFileSync(targetPathDev, envFileContent);
