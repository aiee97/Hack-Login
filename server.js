const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Users = require('./models/Users');
<<<<<<< HEAD
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

const initialisePassport = require('./passport-config')
initialisePassport(
    passport, 
    username => users.find(user => user.username === username),
    id => users.find(user => user.id === id)
)

const users = []

const app = express();
=======
const bodyParser = require('body-parser');
const app = express();
const fileUpload = require('express-fileupload');

// const initialisePassport = require('./passport-config')
// const passport = require('passport')
// initialisePassport(passport)

>>>>>>> db491c47079e3e7c744ad8bf7edd6e577595759d
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());

// Routes 
app.get('/', (req, res) => {
<<<<<<< HEAD
    res.render('index.ejs')
=======
    res.render('index.ejs', { name: "Kyle"})
>>>>>>> db491c47079e3e7c744ad8bf7edd6e577595759d
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
>>>>>>> db491c47079e3e7c744ad8bf7edd6e577595759d
app.get('/', (req,res) => {
    res.send('Home page for users');
})

<<<<<<< HEAD
app.get('/users', (req,res) => {
    User.find()
    .then(data=>{
        res.json(data)
    })
})

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

app.post('/users/login', async (req, res) => {
    const user = await User.findOne( {username: req.body.username} )
=======
app.get('/users/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/users', (req,res) => {
    Users.find({})
    .then(data =>{
        res.json(data)
    })
})

app.post('/users/login', async (req, res) => {
    console.log(req.body.msg)
    console.log(req.files)
    const user = await Users.findOne( {username: req.body.username} )
>>>>>>> db491c47079e3e7c744ad8bf7edd6e577595759d
    if(user==null){
        return res.status(400).send('Could not find user');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
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


// Launch server on port 3005
const port = process.env.PORT || 3000  
app.listen(port, ()=>console.log(`Listening on port ${port}...`)) 