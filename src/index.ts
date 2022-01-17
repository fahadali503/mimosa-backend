import 'source-map-support/register';

// std
import * as http from 'http';

// 3p
import { Config, createApp, displayServerURL, ServiceManager } from '@foal/core';

// App
import { AppController } from './app/app.controller';

import * as cors from 'cors'
import * as Express from 'express';

async function main() {
  const express = Express()
  express.use(cors({ origin: "http://localhost:3000" }))
  const serviceManager = new ServiceManager();
  const app = await createApp(AppController, { expressInstance: express });
  const httpServer = http.createServer(app);
  const port = Config.get('port', 'number', 3001);
  httpServer.listen(port, () => displayServerURL(port));
}

main()
  .catch(err => { console.error(err.stack); process.exit(1); });
