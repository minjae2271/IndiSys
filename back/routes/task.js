const express = require('express');
const moment = require("moment");
const multer = require("multer");
const multerS3 = require('multer-s3');
const AWS = require('aws-sdk');

const path = require("path");
const db = require('../models');
const { isLoggedIn } = require('./middlewares');
const Op = db.Sequelize.Op;

const router = express.Router();

AWS.config.update({
    region: 'ap-northeast-2',
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCEESS_KEY,
})

const today = moment().format('YYYY-MM-DD');

const upload = multer({
    storage: multerS3({
        s3: new AWS.S3(),
        bucket: 'indi-elevator-design',
        key(req, file, cb) {
            cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
        }
    }),
    // storage: multer.diskStorage({
    //     destination(req, file, done) {
    //         done(null, 'uploads');
    //     },
    //     filename(req, file, done) {
    //         const ext = path.extname(file.originalname);
    //         const basename = path.basename(file.originalname, ext);
    //         done(null, basename + Date.now() + ext);
    //     },
    // }),
    limits: { fileSize: 20 * 1024 * 1024}
})

router.post('/before', isLoggedIn, upload.array('beforeImage'), (req, res, next) => {
    res.json(req.files.map(v => v.location));
});
router.post('/after', isLoggedIn, upload.array('afterImage'), (req, res, next) => {
    res.json(req.files.map(v => v.location));
});

router.get('/loadTasks', async (req, res, next) => {
    try {
        if(req.query.statusCheck === '99') {
            const tasks = await db.Task.findAll({
                where: {
                    start_date: {
                        [Op.between] : [req.query.from, req.query.to],
                    }        
                }, include: [{
                    model: db.User,
                    attributes: [
                        'id',
                        'name',
                    ]
                }],
            });
            return res.status(200).json(tasks);
        } else {
            const tasks = await db.Task.findAll({
                where: {
                    [Op.and] : [
                        {
                            status : req.query.statusCheck,
                        },
                        {
                            start_date: {
                                [Op.between] : [req.query.from, req.query.to],
                            }
                        },
                    ]
                },
                include: [{
                    model: db.User,
                    attributes: [
                        'id',
                        'name',
                    ]
                }],
            });
            return res.status(200).json(tasks);
        }       
    } catch(err){
        console.error(err);
        return next(err);
    }
});

router.get('/loadTask', async (req, res, next) => {
    try {
        const task = await db.Task.findOne({
            where: {
                id: req.query.id
            },
            include: [{
                model: db.User,
                attributes: [
                    'id',
                    'name',
                ]
            }, {
                model: db.Image,
            }],
        });
        return res.status(200).json(task);
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.post('/finishTask', isLoggedIn, async (req, res, next) => {
    try {
        await db.Task.update({
            status: "3",
            done_date: today,
        }, {
            where: {
                id: req.body.id
            }
        });
        if(Array.isArray(req.body.beforeImages)) {
            await Promise.all(req.body.beforeImages.map((beforeImage) => {
                return db.Image.create({
                    src: beforeImage,
                    before_after: 'before',
                    TaskId: req.body.id
                })
            }))
        } else {
            await db.Image.create({
                src: beforeImage,
                before_after: 'before',
                TaskId: req.body.id
            })
        }
        if(Array.isArray(req.body.afterImages)) {
            await Promise.all(req.body.afterImages.map((afterImage) => {
                return db.Image.create({
                    src: afterImage,
                    before_after: 'after',
                    TaskId: req.body.id
                })
            }))
        } else {
            await db.Image.create({
                src: afterImage,
                before_after: 'after',
                TaskId: req.body.id
            })         
        }
        return res.status(200).send('작업 완료.')
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.post('/createTask', isLoggedIn, async (req, res, next) => {
    try {
        const newTask = await db.Task.create({
            start_date: req.body.from,
            done_date: req.body.to,
            status: "1",
            task_title: req.body.taskTitle,
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
        console.error(err);
        return next(err);
    }
});

router.patch('/:id', isLoggedIn, async (req, res, next) => {
    try {
        const updatedTask = await db.Task.update({
            start_date: req.body.from,
            done_date: req.body.to,
            status: req.body.status,
            task_title: req.body.taskTitle,
            task_text: req.body.taskText,
        }, {
            where: {
                id: req.params.id
            }
        });
        return res.status(200).json(updatedTask);
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.delete('/:id', isLoggedIn, async (req, res, next) => {
    try {
        await db.Task.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send('작업 삭제 완료');
    } catch(err) {
        console.error(err);
        return next(err);
    }
});

router.delete('/deleteImg/:id', isLoggedIn, async (req, res, next) => {
    try {
        await db.Image.destroy({
            where: {
                id: req.params.id
            }
        });
        return res.status(200).send('이미지 삭제 완료');
    } catch(err) {
        console.error(err);
        return next(err);
    }
})

module.exports = router;