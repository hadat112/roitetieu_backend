import Play from "../models/Play";
import { multiMongooseToObject } from "../util/mongoose.js";
import path from "path";
import Resize from "../util/resize";
const fs = require("fs");

class PlayController {
    async index(req, res, next) {
        Play.find({})
            .then((plays) => {
                plays = multiMongooseToObject(plays);
                res.send({ data: plays, success: true, status: 200 });
            })
            .catch(next);
    }

    async savePlay(req, res, next) {
        const path = "http://localhost:4001/image?fileName=" + req.files.image[0].originalname
        const play = new Play({
            name: req.body.name,
            content: req.body.content,
            slug: req.body.slug,
            image: path,
        });
        
        var result = await play.save();
        // if (true) {
        //   res.send({ success: false, message: "Khong the luu" });
        // }
        res.send({ data: play, success: true });
    }
}

const playController = new PlayController();

export default playController;
