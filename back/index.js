const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');

const passportConfig = require('./passport');
const db = require('./models');
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const taskRouter = require('./routes/task');

const app = express();

db.sequelize.sync();
// db.sequelize.sync({force:true});
passportConfig();

app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:3080',
    credentials: true,
}));
app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'cookiesecret',
    cookie: {
        httpOnly: true,
        secure: false,
    },
}));
app.use(passport.initialize());
app.use(cookie('cookiesecret'));
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send('안녕 백엔드!');
});

app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/task', taskRouter);

app.listen(3085, () => {
    console.log(`backend server / port : ${3085}`);
});