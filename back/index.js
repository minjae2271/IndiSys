const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const passport = require('passport');
const session = require('express-session');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const hpp = require('hpp');
const helmet = require('helmet');
const dotenv = require('dotenv');

const prod = process.env.NODE_ENV === 'production'

const passportConfig = require('./passport');
const db = require('./models');
const userRouter = require('./routes/user');
const registerRouter = require('./routes/register');
const taskRouter = require('./routes/task');

const app = express();

dotenv.config();

db.sequelize.sync();
// db.sequelize.sync({force:true});
passportConfig();

if (prod) {
    app.use(helmet());
    app.use(hpp());
    app.use(morgan('combined'));
    app.use(cors({
        origin: ['http://indi-elevator-design.com', 'http://www.indi-elevator-design.com'],
        credentials: true,
    }));

} else {
    app.use(morgan('dev'));
    app.use(cors({
        origin: 'http://localhost:3080',
        credentials: true,
    }));
}



app.use('/', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookie(process.env.COOKIE_SECRET));
app.use(session({
    secret: process.env.COOKIE_SECRET,
    cookie: {
        saveUninitialized: false,
        httpOnly: true,
        secure: false,
        domain: prod && '.indi-elevator-design.com',
    },
}));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.status(200).send('안녕 백엔드!');
});

app.use('/user', userRouter);
app.use('/register', registerRouter);
app.use('/task', taskRouter);

app.listen(prod ? process.env.PORT : 3085, () => {
    console.log(`backend server / port : ${prod ? process.env.PORT : 3085}`);
});