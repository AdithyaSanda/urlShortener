import generateCode from "../utils/generateCode.js";
import urlModel from "../models/urlModel.js";

const shortenUrl = async (originalUrl, userId) => {
    const shortCode = generateCode()

    const newUrl = await urlModel.create({
        originalUrl,
        shortCode,
        userId
    })
    
    return shortCode
}

export default shortenUrl