import urlModel from "../models/urlModel.js";

const getUrlsController = async (req, res) => {
    try {
        const userId = req.user

        const urls = await urlModel.find({userId}).sort({createdAt: -1})

        res.json(urls)
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default getUrlsController