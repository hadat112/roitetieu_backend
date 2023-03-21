import siteRouter from './site.js';
import introduceRouter from './introduce.js';

const route = (app) => {
    // app.use('/news', newRouter);
    app.use('/overview', introduceRouter);
    app.use('/', siteRouter);
}

export default route