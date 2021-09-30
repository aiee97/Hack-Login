const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const User = require('./models/User');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(cors());


// Routes 
app.get('/', (req, res) => {
    res.render('index.ejs', { name: "Kyle"})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/', (req,res) => {
    res.send('Home page for users');
})

app.get('/users', (req,res) => {
    User.find()
    .then(data=>{
        res.json(data)
    })
})

app.post('/users/register', async (req, res) => {
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
})

app.post('/users/login', async (req, res) => {
    const user = await User.findOne( {username: req.body.username} )
    if(user==null){
        return res.status(400).send('Could not find user');
    }
    try{
        if(await bcrypt.compare(req.body.password, user.password)){
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


// Launch server on port 3005
const port = process.env.PORT || 3000  
app.listen(port, ()=>console.log(`Listening on port ${port}...`)) 