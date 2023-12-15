import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Todo from "../modules/Todo.js";
import User from "../modules/User.js";

export const RemoveTodo = async (req, res) => {

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "todo id is required", error.mapped()));
    }

    try {
        const result = await Todo.findOneAndDelete({
            userId: req.userId,
            _id: req.body.todo_id
        });
        if(result){
            const user = await User.findOneAndUpdate({
                _id:req.userId
            },{
                $pull : {todos: req.body.todo_id}
            });

        return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo deleted", user));
        }
    } catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY,"Could not process", error));
    }

};