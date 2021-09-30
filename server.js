const express = require('express');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const Users = require('./models/Users');

const app = express();

// const initialisePassport = require('./passport-config')
// const passport = require('passport')
// initialisePassport(passport)

app.use(express.json());
app.use(cors());


// Routes 
/*
app.get('/', (req, res) => {
    res.render('index.ejs', { name: "Kyle"})
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

*/
app.get('/', (req,res) => {
    res.send('Home page for users');
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.get('/users', (req,res) => {
    Users.find({})
    .then(data =>{
        res.json(data)
    })
})

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