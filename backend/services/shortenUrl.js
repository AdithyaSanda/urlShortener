import generateCode from "../utils/generateCode.js";
import urlModel from "../models/urlModel.js";

const shortenUrl = async (originalUrl, userId) => {

    const existing = await urlModel.findOne({originalUrl})

    if(existing) {
        return "exists"
    }

    const shortCode = generateCode()

    const newUrl = await urlModel.create({
        originalUrl,
        shortCode,
        userId
    })
    
    return newUrl
}

export default shortenUrl