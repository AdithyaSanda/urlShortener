import UserModel from "../models/UserModel.js";

const getUserDetailsController = async (req, res) => {
    try {
        const user = await UserModel.findById(req.user).select('-password')

        res.json(user)
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}

export default getUserDetailsController