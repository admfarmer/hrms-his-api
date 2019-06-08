require('dotenv').config();

import * as path from 'path';
import * as logger from 'morgan';
import * as cookieParser from 'cookie-parser';
import * as bodyParser from 'body-parser';
import * as ejs from 'ejs';
import * as HttpStatus from 'http-status-codes';
import * as express from 'express';
import * as cors from 'cors';

import Knex = require('knex');
import { MySqlConnectionConfig } from 'knex';
import { Router, Request, Response, NextFunction } from 'express';
import { Jwt } from './models/jwt';

import accountRoute from './routes/v1/account';
import departRoute from './routes/v1/depart';
import genderRoute from './routes/v1/gender';
import incidentRoute from './routes/v1/incident';
import levelRoute from './routes/v1/level';
import notypeRoute from './routes/v1/notype';
import personRoute from './routes/v1/person';
import positionRoute from './routes/v1/position';
import safetyRoute from './routes/v1/safety';
import sideRoute from './routes/v1/side';
import typeRoute from './routes/v1/type';
import userRoute from './routes/v1/user';
import reportsRoute from './routes/v1/report';
import subitemsRoute from './routes/v1/sub_item';
import locationRoute from './routes/v1/l_location';
import sexRoute from './routes/v1/l_sex';
import timeRoute from './routes/v1/l_time';
import affectedRoute from './routes/v1/l_affected';

import indexRoute from './routes/index';
import loginRoute from './routes/login';
import apiRoute from './routes/api';

// Assign router to the express.Router() instance
// Assign router to the express.Router() instance
const app: express.Application = express();

const jwt = new Jwt();

//view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('.ejs', ejs.renderFile);
app.set('view engine', 'ejs');

//uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname,'../public','favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(cors());

let connection: MySqlConnectionConfig = {
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  multipleStatements: true,
  debug: true
}

let db = Knex({
  client: 'mysql',
  connection: connection,
  pool: {
    min: 0,
    max: 100,
    afterCreate: (conn, done) => {
      conn.query('SET NAMES utf8', (err) => {
        done(err, conn);
      });
    }
  },
  debug: true,
  acquireConnectionTimeout: 1500000
});

app.use((req: Request, res: Response, next: NextFunction) => {
  req.db = db;
  next();
});

let checkAuth = (req: Request, res: Response, next: NextFunction) => {
  let token: string = null;

  if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.query && req.query.token) {
    token = req.query.token;
  } else {
    token = req.body.token;
  }

  jwt.verify(token)
    .then((decoded: any) => {
      req.decoded = decoded;
      next();
    }, err => {
      return res.send({
        ok: false,
        error: HttpStatus.getStatusText(HttpStatus.UNAUTHORIZED),
        code: HttpStatus.UNAUTHORIZED
      });
    });
}

app.use('/login', loginRoute);
app.use('/api', checkAuth, apiRoute);
app.use('/', indexRoute);


app.use('/v1/account', accountRoute);
app.use('/v1/gender', genderRoute);
app.use('/v1/depart', departRoute);
app.use('/v1/incident', incidentRoute);
app.use('/v1/level', levelRoute);
app.use('/v1/notype', notypeRoute);
app.use('/v1/person', personRoute);
app.use('/v1/position', positionRoute);
app.use('/v1/safety', safetyRoute);
app.use('/v1/side', sideRoute);
app.use('/v1/type', typeRoute);
app.use('/v1/user', userRoute);
app.use('/v1/report', reportsRoute);
app.use('/v1/subitem', subitemsRoute);
app.use('/v1/location', locationRoute);
app.use('/v1/sex', sexRoute);
app.use('/v1/time', timeRoute);
app.use('/v1/affected', affectedRoute);

//error handlers
if (process.env.NODE_ENV === 'development') {
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.log(err.stack);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      error: {
        ok: false,
        code: HttpStatus.INTERNAL_SERVER_ERROR,
        error: HttpStatus.getStatusText(HttpStatus.INTERNAL_SERVER_ERROR)
      }
    });
  });
}

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(HttpStatus.NOT_FOUND).json({
    error: {
      ok: false,
      code: HttpStatus.NOT_FOUND,
      error: HttpStatus.getStatusText(HttpStatus.NOT_FOUND)
    }
  });
});

export default app;