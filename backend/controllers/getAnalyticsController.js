import urlModel from "../models/urlModel.js";

const getAnalyticsController = async (req, res) => {
    try {
        const {id} = req.params
        const url = await urlModel.findById(id)

        res.json(url)
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default getAnalyticsController