const express = require('express');
const app = express();

app.get('/image', function (req, res) {
    const fileName= req.query.fileName;
    res.sendFile(__dirname + "/uploads/images/" + fileName);
});

app.listen(4002, function () {
    console.log('Server listening on port 8080');
});