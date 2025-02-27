const express = require('express')
const user = require('../models/user')
const multer = require("multer");
const path = require("path");
// const app = express()

const router = express.Router()

router.use("/uploads", express.static("uploads"));


const storage = multer.diskStorage({
    destination: "./uploads/",
    filename: (req, file, cb) => {
        cb(null, "imgFile-" + Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage: storage });

router.post('/postUserDetail', upload.single("image"), async (req, res) => {

    // const detail = req.body
    // console.log(req.body);

    const userDetails = new user({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        number: req.body.number,
        place: req.body.place,
        image: req.file.filename,
    })
    await userDetails.save()
    res.status(201).json({ message: "Data Saved", userDetails })

})

router.get('/getUserDetails', async (req, res) => {
    try {
        let data = await user.find()
        res.status(200).json(data)
    } catch (error) {
        console.log("**********");

    }
})

module.exports = router