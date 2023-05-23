const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const db = require('../models');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');

const router = express.Router()
router.post('/');

router.post('/', isNotLoggedIn,  async (req, res, next) => {
    try {
        const hash = await bcrypt.hash(req.body.password, 12);

        const exUser = await db.User.findOne({
            where: {
                name: req.body.name,
            },
        });

        if (exUser) {
            return res.status(403).json({
                errorCode: 1,
                errorMessage: '이미 가입된 이름입니다.',
            });
        }
        const newUser = await db.User.create({
            name: req.body.name,
            password: hash,
        });
        return res.status(201).json(newUser);
    } catch(err){
        console.log(err);
        return next(err);
    }
});

router.post('/login', isNotLoggedIn,  (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            console.error(err);
            return next(err);
        }
        if (info) {
            return res.status(401).send(info.reason);
        }
        return req.login(user, async (err) => {
            if (err) {
                console.error(err);
                return next(err);
            }
            return res.json(user);
        });
    })(req, res, next);
});

router.post('/logout', isLoggedIn, (req, res, next) => {
        req.logout((err) => {
            if (err) { return next(err); }
            req.session.destroy();
            res.redirect('/');
        });

        // req.logOut(err => {
        //     if (err) {
        //       return next(err);
        //     } else {
        //         return res.status(200).send('로그아웃 되었습니다.');
        //     }
        // });
        // req.session.destroy();
})

module.exports = router;