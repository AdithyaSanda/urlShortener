import generateCode from "../utils/generateCode.js";
import urlModel from "../models/urlModel.js";

const shortenUrl = async (originalUrl) => {
    const shortCode = generateCode()

    const newUrl = await urlModel.create({
        originalUrl,
        shortCode
    })
    
    return shortCode
}

export default shortenUrl