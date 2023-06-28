// const login = (req, res) => {
//     return {
//         username: req.body.username       
//     }
// }
//
// module.exports = {
//     login
// }

module.exports = {
    login: async (req, res) => {
        try {
          console.log(req.body);
            if (req.body.username !== 'Brad' && req.body.username !== 'Janet' ){
                throw {
                    status: 404,
                    message: "User Not Found"
                }
            }

            if (req.body.password !== 'abc'){
                throw {
                    status: 403,
                    message: "Invalid Password"
                }
            }
            res.status(200).json({
                username: req.body.username,
                password: req.body.password,
                message: "Successful Login!!"
            })  
        } catch (error) {
            res.status(error.status).json(error.message)
        }
    },
    register: async (req, res) => {
         res.status(200).json({
            message: `Successfully Registered ${req.body.username}`
        })  
        }
    

    // add controller function object
}

