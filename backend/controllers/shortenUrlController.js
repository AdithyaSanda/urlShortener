import shortenUrl from "../services/shortenUrl.js"

const shortenUrlController =  async (req, res) => {
    try {
        const {originalUrl} = req.body

        try {
            new URL(originalUrl)
        }
        catch(err) {
            return res.status(400).json({message: "Invalid URL"})
        }

        const shortCode = await shortenUrl(originalUrl)

        res.status(201).json({
            shortUrl: `${req.protocol}://${req.get("host")}/${shortCode}`
        })
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
    
}

export default shortenUrlController