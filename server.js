if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
<<<<<<< HEAD
const User = require('./models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initialisePassport = require('./passport-config')
initialisePassport(
    passport, 
    username => users.find(user => user.username === username)
)

const users = []
=======
const Users = require('./models/Users');
>>>>>>> 0133e8896d898a5d08c8ad61bd7315111fb36bfe

const app = express();

// const initialisePassport = require('./passport-config')
// const passport = require('passport')
// initialisePassport(passport)

app.use(express.json());
app.use(cors());

app.set('view-engine', 'ejs')
app.use(express.urlencoded({extend : false}))
app.use(flash())
app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))
app.use(passport.initialize())
app.use(passport.session())




// Routes 
/*
app.get('/', (req, res) => {
    res.render('login.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

<<<<<<< HEAD
app.post('/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/login',
    failureFlash : true
}))

/*app.get('/register', (req, res) => {
    res.render('register.ejs')
})*/

=======
*/
>>>>>>> 0133e8896d898a5d08c8ad61bd7315111fb36bfe
app.get('/', (req,res) => {
    res.send('Home page for users');
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

<<<<<<< HEAD
/*app.post('/users/register', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    })
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        user.password = hashedPassword;
        user.save();
        res.status(201).send(user);
    } catch{
        res.status(500).send('Error');
    }
})*/
=======
app.get('/users', (req,res) => {
    Users.find({})
    .then(data =>{
        res.json(data)
    })
})
>>>>>>> 0133e8896d898a5d08c8ad61bd7315111fb36bfe

app.post('/login', async (req, res) => {
    const user = await Users.findOne( {username: req.body.username} )
    if(user==null){
        return res.status(400).send('Could not find user');
    }
    try{
        if(req.body.password === user.password){
            res.send('Login success');
        } else{
            res.send('Password incorrect')
        }
    } catch{
        res.status(500).send('Error');
    }
})

// Connect to database
const url = 'mongodb+srv://khairi:password21@cluster0.hnh05.mongodb.net/Test?retryWrites=true&w=majority'
mongoose.connect(url,
    ()=>{
        console.log('Connected to mongoDB...');
    }
)

// Launch server on port 3000
const port = process.env.PORT || 3000  
app.listen(port, ()=>console.log(`Listening on port ${port}...`)) 