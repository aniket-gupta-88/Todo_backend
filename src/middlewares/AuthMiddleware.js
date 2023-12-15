import { JWT_TOKEN_SECRET, StatusCode } from "../utils/Constants.js"
import { jsonGenerate } from "../utils/helper.js"
import jwt from 'jsonwebtoken';

const AuthMiddleware = (req, res, next) => {
    if(req.headers['auth'] === undefined){
        return res.json(jsonGenerate(StatusCode.AUTH_ERROR, "Acess denied"))
    }

    const token = req.headers['auth'];
    try {
        const decoded = jwt.verify(token, JWT_TOKEN_SECRET);
        // console.log("decoded: ", decoded);
        req.userId = decoded.userId;
        // console.log("UserId :- ", req.userId);

        return next();
    } catch (err) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Invalid token"))
    }
};

export default AuthMiddleware;