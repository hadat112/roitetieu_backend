import Post from '../models/Post';
import Comment from '../models/Comment';
import { multiMongooseToObject } from '../util/mongoose.js';
import unorm from 'unorm';

class IntroduceController {
  // [GET] /
  async index(req, res, next) {
    if (req.query.type == 'post') {
      Post.find({})
        .then((posts) => {
          posts = multiMongooseToObject(posts);
          res.send({ "data": posts, "success": true, "status": 200 });
        })
        .catch(next)
    } else if (req.query.type == 'recent') {
      const posts = await Post.find({}).sort('-date').limit(5).then(function (posts) {
        if (posts) res.status(200).send({ success: true, data: posts.map(post => ({ title: post.title, slug: post.slug, type: post.type, id: post._id })) });
      }).catch((err) => {
        console.log(err);
      });
    } else if (req.query.type == 'view') {
      const posts = await Post.find({}).sort('-count').limit(5).then(function (posts) {
        if (posts) res.status(200).send({ success: true, data: posts.map(post => ({ title: post.title, slug: post.slug, type: post.type, id: post._id })) });
      }).catch((err) => {
        console.log(err);
      });
      console.log(posts);

    }
    // res.status(200).send({ success: false, message: 'Có lỗi trong quá trình xử lí dữ liệu' });
  }

  async savePost(req, res) {
    const formData = req.body;
    const post = new Post(formData);
    var result = await post.save();
    if (!result) {
      res.send({ success: false, message: 'Khong the luu' });
    }
    res.send({ data: post, success: true });
  }

  async saveComment(req, res) {
    const formData = req.body;
    const comment = new Comment({ ...formData, username: req.username });
    var result = await comment.save();
    if (!result) {
      res.send({ success: false, message: 'Khong the luu' });
    }
    res.send({ data: comment, success: true });
  }

  async deletePost(req, res) {
    const result = await Post.findByIdAndDelete(req.query.id)
      .then(() => {
        res.status(200).send({ success: true });
      })
      .catch(() => {
        res.send({ success: false, message: 'Khong the luu' });
        next();
      });
  }

  async search(req, res) {
    const title = unorm.nfd(req.query.text).replace(/[\u0300-\u036f]/g, '');
    const posts = await Post.find({ slug: { $regex: title, $options: 'i' } })
      .catch(err => {
        res.status(200).send({
          success: false,
          message: "Có lỗi trong quá trình xử lí dữ liệu",
        });
      });
    if (posts) {
      res.status(200).send({
        success: true,
        data: posts.map(post => ({
          value: post._id,
          label: post.title,
          slug: post.slug,
        }))
      });
    }
  }
}

const introduceController = new IntroduceController();
export default introduceController;
