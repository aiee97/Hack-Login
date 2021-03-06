const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const Users = require('./models/Users');

function initialise(passport) {
    const authenticateUser = async (username, password, done) => {
        const user = getUserByUsername(username)
        // const user = Users.findOne( {username: username} )
        if (user == null){
            return done(null, false, {message: 'Username not found'})
        }

        try{
            if (await bcrypt.compare(password, user.password)){
                return done(null, user)
            }else{
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch(e){
            return done(e)
        }

    }
    passport.use(new LocalStrategy({usernameField:'username'}, 
    authenticateUser))

    passport.serializeUser((user, done)=> done(null, user.id))
    passport.deserializeUser((id, done)=>{ 
        return done(null, getUserByID(id))
     })
}

module.exports = initialise