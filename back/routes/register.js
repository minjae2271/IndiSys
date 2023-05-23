const express = require('express');
const db = require('../models');
const { isLoggedIn } = require('./middlewares');

const router = express.Router()

router.post('/company', isLoggedIn, async (req, res, next) => {
    try {
        const exCompany = await db.Company.findOne({
            where: {
                company_name: req.body.CompanyName,
            },
        });

        if (exCompany) {
            return res.status(403).json({
                errorCode: 1,
                errorMessage: '이미 등록된 회사명입니다.',
            });
        }
        const newCompany = await db.Company.create({
            company_name: req.body.CompanyName,
        });
        return res.status(201).json(newCompany);
    } catch(err){
        return next(err);
    }
});

module.exports = router;