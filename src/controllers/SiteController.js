import Play from '../models/Play';
import Post from '../models/Post';
import Comment from '../models/Comment';
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

   async show(req, res, next) {
       console.log('post');
        const post = await Post.findOne({ slug: req.query.slug })
        if(!post)
            res.send({ message: 'Da co loi', success: false });
        const comments = await Comment.find({post_id: post._id});
        res.send({ data: {post, comments}, success: true });
    }

    async store(req, res) {
        const formData = req.body;
        const play = new Play(formData);
        var result = await play.save();
        res.send(result);
    }
}
const siteController = new SiteController();

export default siteController;
