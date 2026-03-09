import UserModel from "../models/UserModel.js";
import bcrypt from 'bcrypt'

const createUser = async (name, email, password) => {
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
        name,
        email,
        password: encryptedPassword
    })

    return user
}

export default createUser