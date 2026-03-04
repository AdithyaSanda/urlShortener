import generateCode from "../utils/generateCode.js"

const shortenUrlController =  (req, res) => {
    try {
        const originalUrl = req.body

        const shortCode = generateCode(originalUrl)

        res.status(201).json({
            shortUrl: `http://localhost:5000/${shortCode}`
        })
    }
    catch(err) {
        res.status(500).json({error: err.message})
    }
    
}

export default shortenUrlController