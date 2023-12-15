import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import Todo from "../modules/Todo.js";

export const MarkTodo = async (req, res) => {
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "todo id is required", error.mapped()))
    }
    console.log(req.body.todo_id, req.userId)
    try {
       
        const todo = await Todo.findOneAndUpdate(
            {
                _id: req.body.todo_id,
                userId: req.userId
            },[
                {
                    $set: {
                        isCompleted: { 
                            $eq: [false, "$isCompleted"]
                         },
                    }
                }
            ]);
        
        const updatedtodo = await Todo.findOne({
            _id: req.body.todo_id,
            userId: req.userId
        }) 
        console.log("Updated todo:", updatedtodo);
        if(todo){
            return res.json(jsonGenerate(StatusCode.SUCCESS, "Updated", updatedtodo))
        }
    }
     catch (error) {
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Could not update", null))
    }
};
