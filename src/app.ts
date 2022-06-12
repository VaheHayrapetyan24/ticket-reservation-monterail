import bodyParser from 'body-parser';
import http from 'http';
import express from 'express';
import 'reflect-metadata';
import { Container } from 'typedi';
import { createConnection } from 'typeorm';
import { useExpressServer, useContainer } from 'routing-controllers';
import winston from 'winston';

import config from './config';
import controllers from './modules/controllers';
import { AuthorizationMiddleware } from './middlewares/authorization.middleware';

export class App {
  public app: express.Application;

  constructor() {
    useContainer(Container);
    const promises = [];
    this.app = express();
    const server = http.createServer(this.app);

    const loggerConfiguration = {
      transports: [new winston.transports.Console()],
    };
    const logger = winston.createLogger(loggerConfiguration);

    useExpressServer(this.app, {
      cors: true,
      development: false,
      defaultErrorHandler: true,
      classTransformer: true,
      validation: true,
      routePrefix: config.apiPrefix,
      controllers,
      authorizationChecker: AuthorizationMiddleware.authorizationChecker,
      middlewares: [
        bodyParser.urlencoded({ extended: true }),
        bodyParser.json(),
      ],
    });

    promises.push(createConnection(config.database));
    promises.push(
      new Promise<void>(resolve => {
        server.listen(config.port, async () => {
          logger.info(`Server started on http://0.0.0.0:${config.port}/`);
          resolve();
        });
      }),
    );

    Promise.all(promises).catch(logger.error);
  }
}

export default new App().app;
