const Play = require("../models/Play");
const Post = require("../models/Post");
const fs = require("fs");
const path = require("path");
const { multiMongooseToObject } = require("../../util/mongoose.js");
class SiteController {
  // [GET] /
  index(req, res, next) {
    Play.find({})
      .then((plays) => {
        plays = multiMongooseToObject(plays);
        res.json(plays);
      })
      .catch(next);

    res.send("post");

    res.render("home");
  }

  search(req, res) {
    res.render("search");
  }

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
module.exports = new SiteController();
