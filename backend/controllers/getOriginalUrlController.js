import getOriginalUrl from "../services/getOriginalUrl.js";
import redisClient from "../config/redis.js";

const getOriginalUrlController = async (req, res) => {
    try {
        const {shortCode} = req.params

        const cachedUrl = await redisClient.get(shortCode)

        if(cachedUrl) {
            return res.redirect(cachedUrl)
        }

        const originalUrl = await getOriginalUrl(shortCode)
        res.set("Cache-Control", "no-store")

        await redisClient.set(shortCode, originalUrl)

        res.redirect(302, originalUrl)
    }
    catch(err) {
        res.status(404).json({error: err.message})
    }
}

export default getOriginalUrlController