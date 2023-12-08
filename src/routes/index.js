import newsRouter from './news';
import siteRouter from './site';
import authRouter from './auth';

function route(app) {
  app.use('/auth', authRouter);
  app.use('/news', newsRouter);
  app.use('/', siteRouter);
}

module.exports = route;
