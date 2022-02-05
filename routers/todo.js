const express = require('express');
const {TodoRepository} = require("../repositories/todo.repository");
const todoRouter = express.Router();

todoRouter
    .get('/', async (req, res) => {
        res.render('todo/list-all',{
            todos: await TodoRepository.findAll() ,
        });

    })
    .get('/:id', async (req, res) => {
        const {id} = req.params;
        const todos = await TodoRepository.find(id);
        console.log(todos);
        res.render('todo/details', {
            todos,
        });
    })
    .post('/', async (req, res) => {
        const record = {title: req.body.name, }
        res.render('todo/added', {
            name: record.title,
            id: await TodoRepository.insert(record),
        });
    })
    .put('/:id',async (req, res) => {
        const record = {id: req.params.id, title: req.body.name}
        await TodoRepository.update(record);
        res.render('todo/modified', {
            name: record.title,
            id: record.id,
        });
    })
    .delete('/:id',async (req, res) => {
        const {id} = req.params;
        console.log(id);
        await TodoRepository.delete(id);
        res.render('todo/deleted');

    })
    .get('/form/add', (req,res)=>{
        res.render('todo/forms/add');
    })
    .get('/form/edit/:id', async (req, res) => {
        const todo = await TodoRepository.find(req.params.id);
        if (!todo) {
            throw new Error('Todo list does not exist');
        }
        res.render('todo/forms/edit', {
            todo,
        });

    });


module.exports = {
    todoRouter,
}