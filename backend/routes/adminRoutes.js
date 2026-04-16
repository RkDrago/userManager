import express from 'express';
const router = express.Router();
import { jwtAuthMiddleware, generateToken } from '../jwt.js';
import User from '../models/user.js';

const checkAdminRole = async (userID) => {
    try {
        const user = await User.findById(userID)
        if (user.role === 'admin')
            return true;
    } catch (err) {
        return false;
    }
}

// Users list
router.get('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (! await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user do not have an access to this route." })
        }

        const user = await User.find()

        //Map the array of candidates
        const userList = user.map((data) => {
            return {
                id: data._id,
                name: data.name,
                email: data.email,
                role: data.role,
                status: data.status,
            }
        })

        res.status(200).json(userList)

    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

// POST route to add a User
router.post('/', jwtAuthMiddleware, async (req, res) => {
    try {
        if (! await checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user do not have an access to this route." })
        }

        const data = req.body  //Assuming the request body contains the User data
        const newUser = new User(data)
        const response = await newUser.save()
        console.log("data saved")
        res.status(200).json({ response: response })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})


router.put('/:userID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user do not have an access to this route." })
        }

        const userID = req.params.userID; //extract the id from the URL parameter
        const updatedUserData = req.body // Updated data for the user

        const response = await User.findByIdAndUpdate(userID, updatedUserData, {
            new: true,
            runValidators: true
        })

        if (!response) {
            return res.status(404).json({ error: "User not found!" })
        }

        console.log("User data updated!")
        res.status(200).json(response)
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

router.delete('/:userID', jwtAuthMiddleware, async (req, res) => {
    try {
        if (!checkAdminRole(req.user.id)) {
            return res.status(403).json({ message: "user do not have an access to this route." })
        }

        const userID = req.params.userID
        const response = await User.findByIdAndDelete(userID)

        if (!response) {
            return res.status(404).json({ error: "User not found!" })
        }

        console.log("User data is deleted!")
        res.status(200).json({ message: "User is deleted successfully!" })
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server Error!")
    }
})

export default router