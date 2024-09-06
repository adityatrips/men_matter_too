const User = require('../models/User');

const signUp = async (req, res) => {
    try {
        const {
            name,
            username,
            email,
            password,
        } = req.body;


        if (!name || !username || !email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        if (await User.findOne({ email })) {
            return res.status(400).json({
                error: 'Email already in use'
            });
        }
        if (await User.findOne({ username })) {
            return res.status(400).json({
                error: 'Username already in use'
            });
        }

        const user = new User({
            name,
            username,
            email,
            password
        });

        await user.save();

        return res.status(201).json({ user });
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        user.comparePassword(password, (error, isMatch) => {
            if (error) {
                return res.status(500).json({ error });
            }

            if (!isMatch) {
                return res.status(401).json({
                    error: 'Incorrect password'
                });
            }

            return res.status(200).json(user);
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, username, bio, pfp } = req.body;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }
        if (!name || !username || !bio || !pfp) {
            return res.status(400).json({
                error: 'All fields are required'
            });
        }

        await user.updateOne({
            name,
            username,
            bio,
            profilePicture: pfp
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

const deleteProfile = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findOneAndDelete(id);

        return res.status(204).json({
            deleted: true
        });
    } catch (error) {
        return res.status(500).json({ error });
    }
}



module.exports = {
    signUp,
    signIn,
    updateProfile,
    deleteProfile
};