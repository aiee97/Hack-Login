const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./models/Users');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
/*
const initialisePassport = require('./passport-config')
initialisePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = [{username:"username5",password:"password5"}];
*/
const app = express();

app.set('view-engine', 'ejs')
//app.use(express.urlencoded({extend : false}))
//app.use(flash())
/*app.use(session({
    secret : process.env.SESSION_SECRET,
    resave : false,
    saveUninitialized : false
}))

app.use(passport.initialize())
//app.use(passport.session())
//const fileUpload = require('express-fileupload');

// const initialisePassport = require('./passport-config')
// const passport = require('passport')
// initialisePassport(passport)
*/
app.use(bodyParser.json());
app.use(cors());
//app.use(fileUpload());

// Routes 
app.get('/', (req, res) => {
    res.render('index.ejs')
})

app.get('/users/login', (req, res) => {
    res.render('login.ejs')
})
/*
app.post('/users/login', passport.authenticate('local',{
    successRedirect : '/',
    failureRedirect : '/users/login',
    failureFlash : true
}))
*/
/*app.get('/register', (req, res) => {
    res.render('register.ejs')
})*/

app.get('/', (req,res) => {
    res.send('Home page for users');
})

app.get('/users', (req,res) => {
    Users.find()
    .then(data=>{
        res.json(data)
    })
})

/*app.post('/users/register', async (req, res) => {
    const user = new Users({
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

app.post('/users/login', async (req, res) => {
    const user = await Users.findOne( {username: req.body.username} )
    if(user==null){
        return res.status(400).send('Could not find user');
    }
    try{
        if(await req.body.password === user.password){
            res.send('Login success');
        } else{
            res.send('Password incorrect');
        }
    } catch{
        res.status(500).send('Error');
    }
})

// Connect to database
const url = 'mongodb+srv://khairi:' + process.env.DB_PASSWORD +' @cluster0.hnh05.mongodb.net/Users?retryWrites=true&w=majority'
mongoose.connect(url,
    ()=>{
        useMongoClient: true;
        console.log('Connected to mongoDB...');
    }
)


// Launch server on port 3000
const port = process.env.PORT || 3000  
app.listen(port, ()=>console.log(`Listening on port ${port}...`)) 