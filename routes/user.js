const express = require('express')
const router = express.Router();
const { signUp, signIn, updateProfile, deleteProfile } = require('../controllers/userController');

router.post('/sign-up', signUp)
router.post("/sign-in", signIn)
router.patch("/:id", updateProfile)
router.delete('/:id', deleteProfile)

module.exports = router;