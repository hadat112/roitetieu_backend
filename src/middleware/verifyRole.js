const verifyRole = (role) => {
    return (req, res, next) => {
        if (!req.role) return res.status(403).send({ message: 'Bạn không có quyền truy cập' });
        if (role !== req.role) return res.status(403).send({ message: 'Bạn không có quyền truy cập' });
        next();
    }
};

export default verifyRole;
