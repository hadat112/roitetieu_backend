import Post from '../models/Post';
import { multiMongooseToObject } from '../util/mongoose.js';

class IntroduceController {
  // [GET] /
  index(req, res, next) {
    Post.find({})
      .then((posts) => {
        posts = multiMongooseToObject(posts);
        console.log('run');
        res.json(posts);
      })
      .catch(next)
    // res.render('home');
  }

  //GET /search
  search(req, res) {
    res.render('search');
  }

  async savePost(req, res) {
    const formData = req.body;
    const post = new Post(formData);
    var result = await post.save();
    if(!result) {
      res.send({success: false, message: 'Khong the luu'});
    }
    res.send({data: post, success: true});
  }

  deletePost(req, res) {
    const result = Post.deleteOne({ _id: req.params.id })
      .then(() => {
        res.send({ success: true });
      })
      .catch(()=>{
        res.send({ success: false, message: 'Khong the luu' });
        next();
      });
  }
}

const introduceController = new IntroduceController();
export default introduceController;
