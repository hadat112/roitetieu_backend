import Play from '../models/Play';
import Post from '../models/Post';
import Comment from '../models/Comment';
import Question from '../models/Question';
import { multiMongooseToObject } from '../util/mongoose';

class SiteController {
    model(req, res) {
        const stream = fs.createReadStream(
            path.join(__dirname, "..", "..", "images", `${req.params.id}-model.glb`)
        );
        stream.pipe(res);
    }

    async show(req, res, next) {
        const post = await Post.findOneAndUpdate({ slug: req.query.slug }, { $inc: { 'count': 1 } });
        if (!post) {
            res.send({ message: 'Da co loi', success: false });
            next();
            return;
        }
        if (post._id) {
            const comments = await Comment.find({ post_id: post._id });
            res.send({ data: { post, comments }, success: true });
        }
    }

    async store(req, res) {
        const formData = req.body;
        const play = new Play(formData);
        var result = await play.save();
        res.send(result);
    }

    async createQuestion(req, res) {
        const formData = req.body;
        const question = new Question(formData);
        var result = await question.save();
        if (!result) {
            res.send({ success: false, message: 'Có lỗi khi lưu câu hỏi' });
        }
        res.send({ data: question, success: true });
    }


    async getQuestions(req, res, next) {
        Question.find({})
            .then((questions) => {
                console.log(questions);
                questions = multiMongooseToObject(questions);
                res.send({ data: questions, success: true, status: 200 });
            })
            .catch(() => {
                res.send({ success: false, status: 200, message: 'Đã có lỗi xảy ra' });
            });
    }

    async deleteQuestion(req, res) {
        const result = await Question.findByIdAndDelete(req.query.id)
            .then(() => {
                res.status(200).send({ success: true });
            })
            .catch(() => {
                res.send({ success: false, message: 'Đã có lỗi xảy ra' });
                next();
            });
    }

    async updateQuestion(req, res) {
        const result = await Question.findByIdAndUpdate(req.body.id, {
            difficulty: req.body.difficulty,
            question: req.body.question,
            category: req.body.category,
            correct_answer: req.body.correct_answer,
            incorrect_answers: req.body.incorrect_answers,
        })
            .then(() => {
                res.status(200).send({ success: true });
            })
            .catch(() => {
                res.send({ success: false, message: 'Đã có lỗi xảy ra' });
                next();
            });
    }

    async getUserInfo(req, res) {
        console.log(req.username, req.role);
        if(req.username && req.role) {
            res.status(200).send({data: {user_name: req.username, role: req.role}});
            return;
        }

        res.status(400).send({message: 'Đã có lỗi xảy ra'})
    }
}
const siteController = new SiteController();

export default siteController;
