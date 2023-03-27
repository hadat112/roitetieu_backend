import Play from '../models/Play';
import Post from '../models/Post';
import Comment from '../models/Comment';
import { multiMongooseToObject } from '../util/mongoose';

class SiteController {
    model(req, res) {
        const stream = fs.createReadStream(
            path.join(__dirname, "..", "..", "images", `${req.params.id}-model.glb`)
        );
        stream.pipe(res);
    }

   async show(req, res, next) {
       const post = await Post.findOneAndUpdate({ slug: req.query.slug }, { $inc: { 'count': 1 } });
        if(!post) {
            res.send({ message: 'Da co loi', success: false });
            next();
            return;
        }
        if(post._id) {
            const comments = await Comment.find({post_id: post._id});
            res.send({ data: {post, comments}, success: true });
        }
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
