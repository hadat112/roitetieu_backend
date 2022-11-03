const Post = require('../models/Post');
const { multiMongooseToObject } = require('../../util/mongoose.js');
class IntroduceController {
    // [GET] /
    index(req, res, next) {
        Post.find({})
            .then((posts) => {
                posts = multiMongooseToObject(posts);
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

    //GET /play
    async store(req, res) {
        const formData = req.body
        const play = new Play(formData);
        var result = await play.save();
        res.send(result)
    }
}
module.exports = new IntroduceController;