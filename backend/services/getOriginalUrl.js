import urlModel from "../models/urlModel.js";

const getOriginalUrl = async (shortCode) => {
    const url = await urlModel.findOne({shortCode})
    if(!url) {
        return null
    }
    
    return url
}

export default getOriginalUrl