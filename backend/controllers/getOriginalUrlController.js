import getOriginalUrl from "../services/getOriginalUrl.js";
import redisClient from "../config/redis.js";
import urlModel from "../models/urlModel.js";

const getOriginalUrlController = async (req, res) => {
    try {
        const {shortCode} = req.params

        const cachedUrl = await redisClient.get(shortCode)

        if(cachedUrl) {
            await urlModel.findOneAndUpdate(
                {shortCode},
                {$inc: {clicks: 1}}
            )
            return res.redirect(cachedUrl)
        }

        const url = await getOriginalUrl(shortCode)
        res.set("Cache-Control", "no-store")

        url.clicks += 1
        await url.save()
        await redisClient.set(shortCode, url.originalUrl)

        res.redirect(302, url.originalUrl)
    }
    catch(err) {
        res.status(401).json({error: err.message})
    }
}

export default getOriginalUrlController