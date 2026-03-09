import createUser from "../services/signup.js";

const signupController = async (req, res) => {
    try {
        const {name, email, password} = req.body

        const user = await createUser(name, email, password)
        res.status(201).json(user)
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}

export default signupController