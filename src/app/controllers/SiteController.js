const Play = require('../models/Play');
const { multiMongooseToObject } = require('../../util/mongoose.js');
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

    //GET /play
    store(req, res, next) {
        console.log(req);
        const formData = req.body
        const play = new Play(formData);
        play.save();
        const re = req;
        res.json({message: `${re}`,
    })
    }
}
module.exports = new SiteController;