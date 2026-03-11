import express from "express"
import { connectDB } from "./config/db.js"
import shortenUrlRoute from "./routes/shortenUrlRoute.js"
import getOriginalUrlRoute from "./routes/getOriginalUrlRoute.js"
import authRoute from "./routes/authRoutes.js"
import refreshRoute from "./routes/refreshRoute.js"
import logoutRoute from "./routes/logoutRoute.js"
import verifyJWT from "./middleware/verifyJWT.js"
import getUrlsRoute from "./routes/getUrlRoute.js"
import deleteUrlRoute from "./routes/deleteUrlRoute.js"
import getAnalyticsRoute from "./routes/getAnalyticsRoute.js"
import rateLimiter from "./middleware/rateLimiter.js"
import getUserDetailsRoute from "./routes/getUserDetailsRouter.js"
import changeUsernameRoute from "./routes/changeUsernameRoute.js"
import changeAvatarRoute from "./routes/changeAvatarRoute.js"
import cookieParser from "cookie-parser"
import cors from 'cors'

const app = express()
// app.use(cors())
app.use(express.json())


connectDB()

app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, proxy-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  res.setHeader("Surrogate-Control", "no-store");
  next();
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser())

app.use("/user", authRoute)
app.use('/logout', logoutRoute)
app.use('/refresh', refreshRoute)

app.use("/api", rateLimiter)

app.use("/api/shorten", verifyJWT, shortenUrlRoute)
app.use("/api/geturls", verifyJWT, getUrlsRoute)
app.use("/api/deleteUrl", verifyJWT, deleteUrlRoute)
app.use("/api/getAnalytics", verifyJWT, getAnalyticsRoute)
app.use("/api/user", verifyJWT ,getUserDetailsRoute)
app.use("/api/user/update", verifyJWT, changeUsernameRoute)
app.use("/api/user/pic", verifyJWT, changeAvatarRoute)

app.use('/uploads', express.static("uploads"))

app.use("/", getOriginalUrlRoute)



app.listen(5000, () => {
    console.log("server running on port 5000")
})