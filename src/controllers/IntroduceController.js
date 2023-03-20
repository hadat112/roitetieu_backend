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

  //GET /store
  async store(req, res) {
    const formData = req.body;
    const post = new Post(formData);
    var result = await post.save();
    res.send(result);
  }
}

const introduceController = new IntroduceController();
export default introduceController;
