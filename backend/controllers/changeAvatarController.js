import UserModel from "../models/UserModel.js";

const changeAvatarController = async (req, res) => {
    try {
        
        const user = await UserModel.findById(req.user)

        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" })
        }

        user.profilePic = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`
        await user.save()

        res.status(201).json(user)
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
}

export default changeAvatarController