const express = require('express');
const router = express.Router();
const prompt = require('prompt');
const multer = require('multer');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');

const auth = require('../../config/auth.js')
const User = require('../../schemas/userschema');
const Image = require('../../schemas/imageschema.js');

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './public/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, (new Date().toISOString() + file.originalname).split(" ").join(""));
    }
});

const fileFilter = (req, file, callback) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        callback(null, true);
    } else {
        callback(null, false);
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

                user.save().then(user => {
                        res.redirect('/dashboard/profile?success=true')
                    })
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
        res.redirect('/dashboard/profile?failure=true');
    }
});

// delete user 
router.post('/deleteUser', auth.ensureAuthenticated, async (req, res) => {
    try {
        const {
            userEmail,
            userRole
        } = req.body

        if (userRole == "admin" || userRole == "manager") {
            res.redirect('/dashboard/profile?role=true');
        } else {
            await User.deleteOne({
                email: userEmail
            });

            res.redirect('/users/signin')
        }

    } catch (err) {
        res.json({
            message: err
        });
    }
})

// update user
router.post('/updateUser', auth.ensureAuthenticated, async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            userEmail,
            region,
            newFirstName,
            newLastName,
            newRegion
        } = req.body

        if (newFirstName == "" && newLastName == "" && newRegion == "") {
            res.redirect('/dashboard/profile?updateFail=true')
        } else {
            await User.updateOne({
                email: userEmail
            }, {
                $set: {
                    firstName: newFirstName ? newFirstName : firstName,
                    lastName: newLastName ? newLastName : lastName,
                    region: newRegion ? newRegion : region
                }
            });
        }

        res.redirect('/dashboard/profile?update=true')

        // res.json(userUpdate);
    } catch (err) {
        res.json({
            message: err
        });
    }
});

// update password
router.post('/updatePassword', auth.ensureAuthenticated, async (req, res) => {
    try {
        const {
            userEmail,
            password,
            password2,
            oldPassword
        } = req.body;

        if (password == password2) {
            await User.findOne({
                email: userEmail
            }).then(user => {
                bcrypt.compare(oldPassword, user.password, (err, isMatch) => {
                    if (err) {
                        throw err;
                    };
                    if (isMatch) {
                        bcrypt.genSalt(10, (err, salt) => {
                            bcrypt.hash(password, salt, (err, hash) => {
                                if (err) throw err;
                                user.password = hash;
                                user.save()
                            });
                        })
                        res.redirect('/dashboard/profile?passwordUpdated=true');
                    } else {
                        res.redirect('/dashboard/profile?passwords=true');
                    };
                })
            });
        } else {
            res.redirect('/dashboard/profile?passwords=true');
        }
    } catch (err) {
        res.json({
            message: err
        });
    }
});

router.post('/prosumerDashboard', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        const {
            userId
        } = req.body

        res.redirect('/prosumerDashboard/' + userId);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

router.post('/prosumerProfile', auth.ensureAuthenticated, auth.check_user, async (req, res, next) => {
    try {
        const {
            userId
        } = req.body

        res.redirect('/prosumerProfile/' + userId);
    } catch (err) {
        res.json({
            message: err
        });
    }
})

module.exports = router;