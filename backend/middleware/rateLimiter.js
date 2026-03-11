import rateLimit from 'express-rate-limit'

const rateLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 1000,
    message: {
        error: "Too many requests, Please try again later."
    }
})

export default rateLimiter