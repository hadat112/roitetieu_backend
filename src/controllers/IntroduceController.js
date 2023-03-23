import Post from '../models/Post';
import Comment from '../models/Comment';
import { multiMongooseToObject } from '../util/mongoose.js';

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

  async savePost(req, res) {
    const formData = req.body;
    const post = new Post(formData);
    var result = await post.save();
    if(!result) {
      res.send({success: false, message: 'Khong the luu'});
    }
    res.send({data: post, success: true});
  }

  async saveComment(req, res) {
    const formData = req.body;
    console.log(req.username);
    const comment = new Comment({...formData, username: req.username});
    var result = await comment.save();
    if (!result) {
      res.send({ success: false, message: 'Khong the luu' });
    }
    res.send({ data: comment, success: true });
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
