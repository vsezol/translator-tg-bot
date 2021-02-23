import * as dotenv from 'dotenv';

dotenv.config();

import * as moduleAlias from 'module-alias';
import appConfig from './app.config';

moduleAlias.addAlias('@', appConfig.moduleAliases['@']);

import { app } from './app';

const BOT_TOKEN = process.env.BOT_TOKEN;

app(BOT_TOKEN);
