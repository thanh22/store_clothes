import newsRouter from './news';
import siteRouter from './site';
import authRouter from './auth';
import { routeNotFound } from '../app/middlewares/HanddleErrors';

function route(app) {
  app.use('/auth', authRouter);
  app.use('/news', newsRouter);
  app.use(routeNotFound);
  app.use('/', siteRouter);
}

module.exports = route;
