import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import UserModel from '../models/UserModel.js'
import bcrypt from 'bcrypt'

dotenv.config()

const loginController = async (req, res) => {
    try {
        const {email, password} = req.body

        if(!email || !password) {
            return res.status(400).json({error: 'All fields are required'})
        }

        const user = await UserModel.findOne({email})

        if(!user) {
            return res.status(400).json({error: "User not found"})
        }

        const match = await bcrypt.compare(password, user.password)
    
        if(match) {
            const accessToken = jwt.sign({"username": user.name, "userId": user._id}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "15m"})
            const refreshToken = jwt.sign({"username": user.name, "userId": user._id}, process.env.REFRESH_TOKEN_SECRET, {expiresIn: "1d"})
            user.refreshToken = refreshToken
            await user.save()
            res.cookie('jwt', refreshToken, {httpOnly: true, sameSite: 'lax', secure: false, maxAge: 24*60*60*1000})
            return res.json({accessToken})
        }
        else {
            return res.sendStatus(401)
        }
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}   

export default loginController