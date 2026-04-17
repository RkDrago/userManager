import express from 'express';
const router = express.Router();
import User from '../models/user.js';
import { jwtAuthMiddleware, generateToken } from '../jwt.js';


//Login route
router.post('/auth/login', async (req, res) => {
    try {
        //extract the email and password from the request body
        const { email, password } = req.body
        const user = await User.findOne({ email: email })

        if (user?.status === "inactive") {
            return res.status(403).json({
                message: "Your account is inactive. Contact admin."
            });
        }

        //if the user is not found or the password is incorrect
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ error: "Invalid email or password" })
        }

        //generate Token
        const payload = {
            id: user.id
        }
        const token = generateToken(payload)
        res.json({ user, token })
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//profile route
router.get('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userData = req.user
        const userId = userData.id
        const user = await User.findById(userId)
        res.status(200).json({ user })

    } catch (error) {
        console.error(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

router.put('/profile', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id;

        const name = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            name,
            { new: true }
        );

        res.status(200).json({
            message: "Profile updated",
            user: updatedUser
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
});


router.put('/profile/change-password', jwtAuthMiddleware, async (req, res) => {
    try {
        const userId = req.user.id //extract the id from the token
        console.log(req)
        const { currentPassword, newPassword } = req.body //extract the current and new password from requrest body

        //Find the user by userId
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // if password does not match, return error
        if (!(await user.comparePassword(currentPassword))) {
            return res.status(401).json({ message: '"Current password is incorrect"' });
        }
        //Update the user's password
        user.password = newPassword;
        await user.save();

        console.log("Password updated!")
        res.status(200).json({ message: "Password updated" })
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})


export default router