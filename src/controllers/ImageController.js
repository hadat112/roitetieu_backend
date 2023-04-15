var root = '/Users/admin/Documents/roinuoc_backend/src/';


class ImageController {
    index(req, res) {
        const fileName = req.query.fileName;
        res.sendFile(root + "uploads/images/" + fileName); 
    }
}

const imageController = new ImageController();

export default imageController;
