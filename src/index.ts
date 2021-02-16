process.env.NTBA_FIX_319 = '1';
process.env.NTBA_FIX_350 = '1';

import * as dotenv from 'dotenv';

dotenv.config();

const BOT_TOKEN = process.env.BOT_TOKEN;
const MODE = process.env.MODE;

import * as moduleAlias from 'module-alias';
import appConfig from './app.config';

configModuleAliasesByMode(MODE);

import { app } from './app';

app(BOT_TOKEN);

function configModuleAliasesByMode(mode: string) {
  if (mode === 'DEV') {
    moduleAlias.addAlias('@', appConfig.moduleAliases.dev['@']);
  } else {
    moduleAlias.addAlias('@', appConfig.moduleAliases.prod['@']);
  }
}
