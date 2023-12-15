import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { JWT_TOKEN_SECRET, StatusCode } from "../utils/Constants.js";
import User from "../modules/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const Login = async (req, res) => {

    const errors = validationResult(req);
    if(errors.isEmpty()){
        const {username, password} = req.body;
        const user = await User.findOne({username: username});

        if(!user){
            return  res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or password not found" ))
        }

        const verified = bcrypt.compareSync(password, user.password);

        if(!verified){
            return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Username or password not found" ))
        }

        const token = jwt.sign({userId: user._id}, JWT_TOKEN_SECRET);

        return res.json(jsonGenerate(StatusCode.SUCCESS, "Login Successful", {userId: user._id, token:token}))
    }

    res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Validation error", errors.mapped()));
}

export default Login