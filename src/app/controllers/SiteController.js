const Play  = require('../models/Play');

class SiteController{
    // [GET] /
    index(req, res){
        Play.find({}, function(err,plays){
            if(!err){
                res.json(plays);
            } else{
                res.status(400).json({error:'ERROR'});
            }
            // res.render('home');
        })
    }
    //GET /search
    search(req,res){
        res.render('search');
    }
}
module.exports = new SiteController;