import UserModel from "../models/UserModel.js";

const changeUsernameController = async (req, res) => {
    try {
        const {username} = req.body
        const user = await UserModel.findById(req.user)

        user.name = username
        user.save();

        res.status(201).json(user)
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}

export default changeUsernameController