const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function initialise(passport) {
    const authenticateUser = (username, password, done) => {
        const user = getUserByUsername(username)
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
    passport.use(new LocalStrategy({usernameField:'username'}), 
    authenticateUser)

    passport.serializeUser((user, done)=>{  })
    passport.deserializeUser((id, done)=>{  })
}

module.exports = initialize