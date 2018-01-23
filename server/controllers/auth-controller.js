const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');


function login(req, res) {
    // 1. get the body
    var email = req.body.email;
    var password = req.body.password;

    if(!email && !password) {
        res.status(400).json({errorMessage: 'Email and password must be set'})
    }
    else {
        // 2. verify the user exists
        User.find().where('email').equals(email).exec(function(err, user) {
            // 3. should return with a valid user
            if(user.length === 0) {
                res.status(404).json({errorMessage: "This user does not exist"})
            }
            else {
                // 4. compare password
                if(!bcrypt.compareSync(password, user[0].password)) {
                    res.status(401).json({errorMessage: "Invalid password"})
                }
                else {
                    var token = jwt.sign({ id: user[0]._id, isAdmin: user[0].isAdmin, iat: Date.now()}, process.env.JWT_SECRET)
                    res.header("Authorization", token).status(200).json({user: user[0], token: token})
                }
            }
        })
    }
}

function register(req, res) {
    // 1. get the body
    var email = req.body.email;
    var password = req.body.password;

    if (!email || !password) {
        res.json({ errorMessage: "Email and password must be set!" })
    }

    // 2. verify to see if user already exists
    User.find().where('email').equals(email).exec(function (err, user) {
        // 3. should return null
        if (user.length > 0) {
            res.json({ errorMessage: "A user with this account already exists!" })
        }
        else {
            req.body.isAdmin = false;

            // 4. creating new user
            var newUser = new User(req.body)
            newUser.save(function (err, user) {
                if (err) {
                    res.json({ errorMessage: "User could not be saved because: " + err })
                }
                else {
                    res.status(200).json(user)
                    console.log(user);
                }
            })
        }
    })
}

function verify(req, res, next) {
    var token = req.header('Authorization')
    jwt.verify(token, process.env.JWT_SECRET, function(error, decoded) {
        if(error) {
            res.json({error: error})
        }
        else {
            req.token = decoded
            next()
        }
    })
}


module.exports = { login, register, verify }