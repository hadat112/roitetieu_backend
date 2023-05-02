import Play from "../models/Play";
import { multiMongooseToObject } from "../util/mongoose.js";
import { uploadFile } from "../config/drive";

class PlayController {
    async index(req, res, next) {
        Play.find({}).sort('-date')
            .then((plays) => {
                plays = multiMongooseToObject(plays);
                res.send({ data: plays, success: true, status: 200 });
            })
            .catch(next);
    }

    async savePlay(req, res, next) {
        const link = await uploadFile(req.files.image);

        const play = new Play({
            name: req.body.name,
            content: req.body.content,
            slug: req.body.slug,
            image: link,
        });

        var result = await play.save();
        if (!result) {
            res.send({ success: false, message: "Khong the luu" });
        }
        res.send({ data: play, success: true });
    }

    async updatePlay(req, res) {
        const link = await uploadFile(req.files.image);

        const result = await Play.findByIdAndUpdate(req.body.id, {
            name: req.body.name,
            content: req.body.content,
            slug: req.body.slug,
            image: link,
        })
            .then(() => {
                res.status(200).send({ success: true });
            })
            .catch(() => {
                res.send({ success: false, message: 'Khong the luu' });
                next();
            });
    }

    async deletePlay(req, res, next) {
        console.log(req.query.id);
        if (!req.query.id) {
            res.status(400).send({ success: false, message: 'Bạn cần gửi lên id' });
            next();
        }

        const result = await Play.findByIdAndDelete(req.query.id)
            .then(() => {
                res.status(200).send({ success: true });
            })
            .catch(() => {
                res.send({ success: false, message: 'Không thể xoá vở diễn' });
                next();
            });
    }

    async detailPlay(req, res, next) {
        const play = await Play.findOne({ slug: req.query.slug });
        if (!play) {
            res.status(200).send({ message: 'Không tìm thấy vở diễn', success: false });
            next();
            return;
        }
        if (play._id) {
            res.status(200).send({ data: { play }, success: true });
        }
    }


}

const playController = new PlayController();

export default playController;
