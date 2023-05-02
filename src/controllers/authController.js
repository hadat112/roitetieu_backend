import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const updateRefreshToken = async (username, password, refreshToken) => {
    await User.findOneAndUpdate(
        { user_name: username, password },
        { $set: { refresh_token: refreshToken } }
    );
};

class AuthController {
    async register(req, res) {
        const user_name = req.body.username;
        const user = await User.findOne({ user_name: user_name });
        if (user) {
            res
                .status(200)
                .send({ message: "Tên tài khoản đã tồn tại.", success: false });
            return;
        }

        if (req.body.password !== req.body.confirm) {
            res
                .status(200)
                .send({
                    message: "Hai mật khẩu bạn nhập không trùng nhau.",
                    success: false,
                });
            return;
        }
        else {
            const hashPassword = bcrypt.hashSync(req.body.password, 10);
            const hashPasswordConfirmation = bcrypt.hashSync(req.body.confirm, 10);
            const accessToken = jwt.sign({ user_info: { user_name, role: 212 } }, "secret", {
                expiresIn: "15000s",
            });
            const refreshToken = jwt.sign({ user_name }, "refreshsecret", {
                expiresIn: "86400s",
            });
            const newUser = new User({
                user_name: user_name,
                password: hashPassword,
                role: 212,
                passwordConfirmation: hashPasswordConfirmation,
                refresh_token: refreshToken,
            });
            newUser.save((error) => {
                if (error) {
                    console.log(error);
                } else {
                    res.status(200).send({
                        success: true,
                        data: { token: accessToken, refreshToken: refreshToken },
                    });
                }
            });
        }
    }


    async login(req, res) {
        const user_name = req.body.username;
        const password = req.body.password;
        const user = await User.findOne({ user_name: user_name });
        if (!user) {
            return res.json({
                success: false,
                message: "Tên đăng nhập không tồn tại.",
            });
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.json({ success: false, message: "Mật khẩu không chính xác." });
        }

        const accessToken = jwt.sign({ user_info: { user_name, role: user.role } }, "secret", { expiresIn: "15000s" });
        const refreshToken = jwt.sign({ user_name }, "refreshsecret", {
            expiresIn: "86400s",
        });
        updateRefreshToken(user_name, refreshToken);
        res.json({
            success: true,
            data: { token: accessToken, refreshToken: refreshToken },
        });
    };

    async refreshToken(req, res) {
        const refreshToken = req.body.refresh_token;
        if (!refreshToken)
            return res
                .status(400)
                .send({ success: false, message: "Refresh token sai!" });
        const user = await User.findOne({ refresh_token: refreshToken });
        if (!user) return res.sendStatus(403).send({ success: false, message: "Refresh token het han" });
        const { user_name } = user;
        try {
            jwt.verify(refreshToken, "refreshsecret");
            const accessToken = jwt.sign({ user_info: { user_name, role: user.role } }, "secret", {
                expiresIn: "15000s",
            });
            const newRefreshToken = jwt.sign({ user_name }, "refreshsecret", {
                expiresIn: "86400s",
            });
            updateRefreshToken(user_name, newRefreshToken);

            res.json({
                success: true,
                data: { token: accessToken, refreshToken: refreshToken },
            });
        } catch (error) {
            console.log(error);
            res.sendStatus(403).send({ success: false, message: 'toekn heets hanj' });
        }
    };
}

const authController = new AuthController();

export default authController;
