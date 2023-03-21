import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import connect from './config/db';
import jwt from 'jsonwebtoken';
const app = express();
const PORT = 5000;

app.use(cors());

// HTTP logger

connect();

import User from './models/User';


app.use(bodyParser.json());

const updateRefreshToken = async (username, refreshToken) => {
    const res = await User.findOneAndUpdate({ user_name: username }, { $set: { refresh_token: refreshToken } })
}

app.post('/login', async (req, res) => {
    const user_name = req.body.user_name;
    const hasUser = await User.find({user_name: user_name})
    if (!hasUser) { return res.json({ "success": "false" }) }
    const accessToken = jwt.sign({ user_name }, 'secret', { expiresIn: '15s' })
    const refreshToken = jwt.sign({ user_name }, 'refreshsecret', { expiresIn: '1h' })
    updateRefreshToken(user_name, refreshToken);
    res.json({ "success": "true", "token": accessToken, "refreshToken": refreshToken });
});

app.post('/refresh-token', async (req, res) => {
    const refreshToken = req.body.refresh_token;
    if (!refreshToken) return res.sendStatus(401);
    const user = await User.find({refresh_token: refreshToken})
    console.log(user, 'user');
    if(!user) return res.sendStatus(403);
    const {user_name, user_id} = user;
    try {
        jwt.verify(refreshToken, 'refreshsecret')
        const accessToken = jwt.sign({ user_name, user_id }, 'secret', {expiresIn: '15s'})
        const newRefreshToken = jwt.sign({ user_name, user_id }, 'refreshsecret', { expiresIn: '1h' })
        updateRefreshToken(user_name, newRefreshToken)

        res.json({ "success": "true", "token": accessToken, "refreshToken": refreshToken })
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
