import urlModel from "../models/urlModel.js";

const getOriginalUrl = async (shortCode) => {
    const url = await urlModel.findOne({shortCode})
    if(!url) {
        return null
    }

    url.clicks++
    await url.save()
    
    return url.originalUrl
}

export default getOriginalUrl