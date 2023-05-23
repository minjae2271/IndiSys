const express = require('express');
const moment = require("moment");
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router()

const today = moment().format('YYYY-MM-DD'); 

router.post('/createTask', isLoggedIn, async (req, res, next) => {
    try {
        const newTask = await db.Task.create({
            date: today,
            status: "1",
            task_text: req.body.taskText,
            UserId: req.user.id
        });

        const fullTask = await db.Task.findOne({
            where: { id: newTask.id },
            include: [{
                model: db.User,
                attributes: [
                    'id',
                    'name',
                ]
            }],
        });
        return res.status(201).json(fullTask);
    } catch(err){
        return next(err);
    }
});

router.get('/loadTasks', async (req, res, next) => {
    try {
        const tasks = await db.Task.findAll({
            // where: {
            //     date: today,
            // },
            include: [{
                model: db.User,
                attributes: [
                    'id',
                    'name',
                ]
            }],
        });
        return res.status(200).json(tasks);
    } catch(err){
        return next(err);
    }
})

module.exports = router;