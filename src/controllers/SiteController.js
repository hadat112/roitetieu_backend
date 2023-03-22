import Play from '../models/Play';
import Post from '../models/Post';
import { multiMongooseToObject } from '../util/mongoose';

class SiteController {
    // [GET] /
    index(req, res, next) {
        Play.find({})
            .then((plays) => {
                plays = multiMongooseToObject(plays);
                res.json(plays);
            })
            .catch(next)
    }

    model(req, res) {
        const stream = fs.createReadStream(
            path.join(__dirname, "..", "..", "images", `${req.params.id}-model.glb`)
        );
        stream.pipe(res);
    }

    show(req, res, next) {
        console.log(req.query);
        Post.findOne({ slug: req.query.slug })
            .then((post) => {
                res.send({ data: post, success: true });
            })
            .catch(() => {
                res.send({ message: 'Da co loi', success: false });
                next();
            });
    }

    async store(req, res) {
        const formData = req.body;
        const play = new Play(formData);
        var result = await play.save();
        res.send(result);
    }


    async getUserInfo(req, res) {

    }
}
const siteController = new SiteController();

export default siteController;
