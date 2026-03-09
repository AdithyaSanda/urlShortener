import UserModel from "../models/UserModel.js"

const logoutController = async (req, res) => {
    try {
        const cookies = req.cookies
        if(!cookies?.jwt) return res.sendStatus(204)

        const refreshToken = cookies.jwt
        const user = await UserModel.findOne({refreshToken})

        if(!user) {
            res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
            return res.sendStatus(204)
        }

        user.refreshToken = ''
        user.save()

        res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true})
        res.sendStatus(204)
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default logoutController
