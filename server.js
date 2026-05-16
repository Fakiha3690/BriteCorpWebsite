require("dotenv").config()

const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const path = require("path")

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// STATIC FILES
app.use(express.static("public"))

// HOME PAGE
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"))
})

// CHECK ENV
if (!process.env.MONGO_URI) {
    console.log("MONGO_URI missing")
    process.exit(1)
}

// DB CONNECT
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err))

// MODEL
const Contact = mongoose.model("Contact", {
    name: String,
    email: String,
    message: String
})

// FORM API
app.post("/contact", async (req, res) => {
    await Contact.create(req.body)
    res.json({ message: "Saved Successfully" })
})

// PORT
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log("Server running on", PORT)
})