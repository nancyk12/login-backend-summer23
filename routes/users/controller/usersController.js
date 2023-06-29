const User = require('../model/User')
const jwt = require('jsonwebtoken')
const { createUser, hashPassword, comparePasswords } = require('./usersHelper')

module.exports = {
    login: async (req, res) => {
        try {
            // console.log(req.body);
            
            //check if user exists / get the user form the db
            let foundUser = await User.findOne({username: req.body.username})
            if (!foundUser) {
                 throw {
                    status: 404,
                    message: "User Not Found"
                }
            }          

            // check if password matches
            let checkedPassword = await comparePasswords(req.body.password, foundUser.password)
            if (!checkedPassword) {
                throw {
                    status: 401,
                    message: "Invalid Password"
                }
            }
            // console.log(foundUser)
            let payload = {
                id: foundUser._id,
                username: foundUser.username
            }

            let token = await jwt.sign(payload, process.env.SUPER_SECRET_KEY, {expiresIn: 5*60})

            res.status(200).json({
                username: req.body.username,
                message: "Successful Login!!",
                token: token
            })  
        } catch (error) {
            res.status(error.status).json(error.message)
        }
    },
    register: async (req, res) => {
        try {
            //if foundUser exists throw an error
            let foundUser = await User.findOne({username: req.body.username})
            if (foundUser) {
                throw {
                    status: 409,
                    message: "User Exists"
                }
            } 

            let newUser = await createUser(req.body)
            
            // hash password
            let hashedPassword = await hashPassword(newUser.password)
            // console.log(hashedPassword);

            //update newUser object with hashed password
            newUser.password = hashedPassword

            //saves newUser to DB
            let savedUser = await newUser.save()

            res.status(200).json({
                    userObj: savedUser,
                    message: "Successfully Registered"
                }) 
        } catch (error) {
            res.status(error.status).json(error.message)
        }
        
    }
    

}

// const login = (req, res) => {
//     return {
//         username: req.body.username
//     }
// }
//
// module.exports = {
//     login
// }