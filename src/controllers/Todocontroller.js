import { validationResult } from "express-validator";
import { jsonGenerate } from "../utils/helper.js";
import { StatusCode } from "../utils/Constants.js";
import User from "../modules/User.js";
import Todo from "../modules/Todo.js";

export const createTodo = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.json(jsonGenerate(StatusCode.VALIDATION_ERROR, "Todo validation failed", errors.array()));
        }

        const result = await Todo.create({
            userId: req.userId,
            desc: req.body.desc,
        });

        if (result) {
            const user = await User.findOneAndUpdate(
                { _id: req.userId },
                {
                    $push: { todos: result },
                },
            );

            return res.json(jsonGenerate(StatusCode.SUCCESS, "Todo created successfully", result));
        }
    } catch (error) {
        console.error("Error creating todo:", error);
        return res.json(jsonGenerate(StatusCode.UNPROCESSABLE_ENTITY, "Something went wrong", error));
    }
};
