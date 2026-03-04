import getOriginalUrl from "../services/getOriginalUrl.js";

const getOriginalUrlController = async (req, res) => {
    try {
        const {shortCode} = req.params
        const originalUrl = await getOriginalUrl(shortCode)
        res.set("Cache-Control", "no-store")
        res.redirect(302, originalUrl)
    }
    catch(err) {
        res.status(404).json({error: err.message})
    }
}

export default getOriginalUrlController