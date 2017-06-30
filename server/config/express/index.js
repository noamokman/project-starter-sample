import express from 'express';
import morgan from 'morgan';
import compression from 'compression';
import {urlencoded, json} from 'body-parser';
import methodOverride from 'method-override';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import mongooseErrors from 'express-mongoose-errors';
import jsonErrorHandler from 'express-json-error-handler';
import inProduction from 'in-production';
import routes from './routes';
import logger from 'env-bunyan';

export default () => {
  const app = express();

  app.use(compression());
  app.use(urlencoded({extended: false}));
  app.use(json());
  app.use(methodOverride());
  app.use(cookieParser());
  app.use(passport.initialize());

  if (!inProduction) {
    app.use(morgan('dev'));
  }

  routes(app);

  app.use(mongooseErrors());
  app.use(jsonErrorHandler({
    log ({err, req, res}) {
      logger.error({err, req, res});
    }
  }));

  return app;
};
