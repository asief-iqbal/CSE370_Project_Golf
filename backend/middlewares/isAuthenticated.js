import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token; // Assuming you're using cookies for authentication
    if (!token) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY); // Replace with your JWT secret
        req.id = decoded.userId; // Set the `userId` to `req.id`
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Unauthorized", success: false });
    }
};

export default isAuthenticated;
