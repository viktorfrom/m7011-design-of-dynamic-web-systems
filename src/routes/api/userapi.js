const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const multer = require('multer');
const mongoose = require("mongoose");

const auth = require('../../config/auth.js')
const User = require('../../schemas/userschema');
const Image = require('../../schemas/imageschema.js');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads');
    },
    filename: function (req, file, cb) {
        cb(null, (new Date().toISOString() + file.originalname).split(" ").join(""));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});;

prompt.start();

// get single user
router.get('/:userId', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const oneUser = await User.findById(req.params.userId);
        res.json(oneUser);
    } catch (err) {
        res.json({
            message: err
        });

    }
});

// get all users
router.get('/', auth.ensureAuthenticated, auth.check_user, async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// upload image
router.post("/image", auth.ensureAuthenticated, upload.single('image'), (req, res, next) => {
    try {
        const image = new Image({
            _id: new mongoose.Types.ObjectId(),
            image: req.file.path
        })

        image.save().then(async data => {
                const user = await User.findOne({
                    email: req.user.email
                });

                user.image = "../" + data.image.slice(7);

                user.save().then(
                        res.redirect('/dashboard/prosumer?success=true')
                    )
                    .catch(err => {
                        res.json({
                            message: JSON.stringify(err)
                        });
                    });
            })
            .catch(err => {
                res.json({
                    message: JSON.stringify(err)
                });
            })
    } catch (err) {
        res.redirect( '/dashboard/prosumer?failure=true');
    }
});

// update user
router.patch('/:userId', async (req, res) => {
    try {
        const userUpdate = await User.updateOne({
            _id: req.params.userId
        }, {
            $set: {
                firstName: req.user.firstName,
                lastName: req.user.lastName,
                email: req.user.email,
                region: req.user.region,
                password: req.user.password,
                image: data.image
            }
        });
        res.json(userUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

module.exports = router;