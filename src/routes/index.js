const newRouter = require('./new.js');
const siteRouter = require('./site.js');

function route(app) {
    app.use('/news', newRouter);
    app.use('/', siteRouter);
}

module.exports = route;