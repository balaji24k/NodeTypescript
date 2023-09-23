"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
let todos = [];
router.get('/', (req, res, next) => {
    console.log("inside get");
    res.status(200).json({ todos: todos });
});
router.post('/todo', (req, res, next) => {
    const body = req.body;
    const newTodo = {
        id: new Date().toISOString(),
        text: req.body.text
    };
    todos.push(newTodo);
    res.status(201).json({ message: "Todo Added!", todo: newTodo, todos });
});
router.put('todo/:todoId', (req, res, next) => {
    const params = req.params;
    const tId = params.todoId;
    const body = req.body;
    const todoIndex = todos.findIndex(todoItem => todoItem.id === tId);
    if (todoIndex >= 0) {
        todos[todoIndex] = {
            id: todos[todoIndex].id,
            text: body.text
        };
        return res.status(200).json({ message: 'Todos Updated!', todos });
    }
    res.status(400).json({ message: "No Todos Found!" });
});
router.delete('/todo/:todoId', (req, res, next) => {
    const params = req.params;
    const tId = params.todoId;
    todos = todos.filter(todoItem => todoItem.id !== tId);
    res.status(200).json({ message: "Todo Deleted!" });
});
exports.default = router;
