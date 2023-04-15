import imageRouter from './image.js';
import siteRouter from './site.js';
import introduceRouter from './introduce.js';
import playRouter from './play.js';

const route = (app) => {
    app.use('/plays', playRouter);
    app.use('/overview', introduceRouter);
    app.use('/image', imageRouter);
    app.use('/', siteRouter);
}

export default route