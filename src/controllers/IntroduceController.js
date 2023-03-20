import Post from '../models/Post';
import { multiMongooseToObject } from '../util/mongoose.js';

class IntroduceController {
    // [GET] /
    index(req, res, next) {
        Post.find({})
            .then((posts) => {
                posts = multiMongooseToObject(posts);
                console.log(run);
                res.json(posts);
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

    //GET /store
    async store(req, res) {
        const formData = req.body
        const play = new Play(formData);
        var result = await play.save();
        res.send(result)
    }
}
const introduceController = new IntroduceController();
export default introduceController;