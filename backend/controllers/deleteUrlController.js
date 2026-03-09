import urlModel from "../models/urlModel.js";

const deleteUrlController = async (req, res) => {
    try {
        const {id} = req.params
        await urlModel.deleteOne({_id: id})

        res.sendStatus(204)
    }
    catch(err) {
        res.status(401).json(err.message)
    }
}

export default deleteUrlController