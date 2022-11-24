const Post = require("../models/Post");

const { multiMongooseToObject } = require("../../util/mongoose.js");
class IntroduceController {
  // [GET] /
  index(req, res, next) {
    Post.find({ type: req.params.type })
      .then((posts) => {
        posts = multiMongooseToObject(posts);
        res.json(posts);
      })
      .catch(next);
    // res.render('home');
  }

  //Post /post
  async store(req, res) {
    const formData = req.body;
    const post = new Post(formData);
    var result = await post.save();
    res.send(result);
  }
}

module.exports = new IntroduceController();
