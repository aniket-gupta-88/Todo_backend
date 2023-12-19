import express from 'express';
import { check } from 'express-validator';
import Register from '../controllers/Registercontroller.js';
import Login from '../controllers/Logincontroller.js';
import { createTodo } from '../controllers/Todocontroller.js';
import {RegisterSchema} from '../ValidationSchema/RegisterSchema.js'
import { LoginSchema } from '../ValidationSchema/LoginSchema.js';
import { GetTodos } from '../controllers/TodoListcontroller.js';
import { MarkTodo } from '../controllers/MarkTodoController.js';
import { RemoveTodo } from '../controllers/RemoveTodocontroller.js';


const apiRoute = express.Router();
export const apiProtected = express.Router();

apiRoute.post('/register', RegisterSchema ,Register )
apiRoute.post('/login', LoginSchema , Login)

// protected routes;
apiProtected.post(
    '/createTodo', 
        [check("desc", "Todo desc is required").exists()], 
        createTodo);

apiProtected.post(
    '/marktodo', 
        [check("todo_id", "Todo id is required").exists()], 
        MarkTodo);

apiProtected.post(
    '/deletetodo', 
        [check("todo_id", "Todo id is required").exists()], 
        RemoveTodo);

apiProtected.get('/todolist', GetTodos);


export default apiRoute
