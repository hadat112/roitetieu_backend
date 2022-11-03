const newRouter = require('./new.js');
const siteRouter = require('./site.js');
const introduceRouter = require('./introduce.js');

function route(app) {
    app.use('/news', newRouter);
    app.use('/overview', introduceRouter);
    app.use('/', siteRouter);
}

module.exports = route;