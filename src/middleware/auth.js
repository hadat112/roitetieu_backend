import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);
  if (!token) {
    res.status(401).send({ success: false, message: 'Bạn chưa đăng nhập' });
  } else {
    try {
      const decoded = jwt.verify(token, "secret");
      req.username = decoded.user_info.user_name;
      req.role = decoded.user_info.role
      next();
    } catch (err) {
      console.log(err, 'loi');
      // next();
    }
  }
};

export default verifyToken;
