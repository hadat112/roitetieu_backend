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
        // res.render('home');
    }

    //GET /search
    search(req, res) {
        res.render('search');
    }

    //GET /search
    play(req, res) {
        res.render(req);
    }

    model(req, res) {
        const stream = fs.createReadStream(
            path.join(__dirname, "..", "..", "images", `${req.params.id}-model.glb`)
        );
        stream.pipe(res);
    }

    show(req, res, next) {
        Post.findOne({ slug: req.params.slug })
            .then((post) => {
                res.json(post);
            })
            .catch(next);
    }

    async store(req, res) {
        const formData = req.body;
        const play = new Play(formData);
        var result = await play.save();
        res.send(result);
    }

    destroy(req, res, next) {
        Post.deleteOne({ _id: req.params.id })
            .then(() => {
                res.json("success");
            })
            .catch(next());
    }

}
const siteController = new SiteController();

export default siteController;
