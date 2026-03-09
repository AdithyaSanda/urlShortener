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

        const newUrl = await shortenUrl(originalUrl, req.user)

        if(newUrl === "exists") {
            return res.json("url already exists")
        }

        res.status(201).json({
            shortUrl: `${req.protocol}://${req.get("host")}/${newUrl.shortCode}`,
            newUrl
        })
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
    
}

export default shortenUrlController