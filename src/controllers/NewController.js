class NewController {
    index(req, res) {
        res.render('news')
    }
}

const newController = new NewController();

export default newController;