import express from 'express';
import here from '../controllers/userController.js';
import User from '../models/users.js';
const userRouter = express.Router();

userRouter.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        if (allUsers) {
            res.send(allUsers);
        }
    } catch (e) {
        res.status(400).send(e.message)
    }
})

userRouter.post('/create', async (req, res) => {
    try {
        const { username, email, password } = req.body; // Assuming the meal plan is sent in the request body
        if (username) {
            let newUser = new User({ username, email, password })
            await newUser.save()
            return res.status(201).json({ message: 'User saved successfully', newUser });
        } else {
            throw new Error({ message: "Error encountered" })
        }
    } catch (error) {
        return res.status(500).json({ message: 'Error saving user', error: error.message });
    }
})

userRouter.get('/search', async (req, res) => {

    const { uname, uemail } = req.query;
    try {

        if (uname && uemail) {
            const userFound = await User.find({ username: uname, email: uemail })
            if (userFound) {
                res.json({ message: "User found", userFound })
            }

        } else {
            res.send(404).json({ message: "no user found" })
        }
    } catch (e) {
        res.status(404).send(e)
    }
    res.status(200).json({ message: "okay" })
})

userRouter.get('/:id', async (req, res) => {
    const userId = req.params.id;

    if (userId) {
        try {
            const _user = await User.findById(userId);
            res.send(_user);
        } catch (e) {
            res.status(404).send(e)
        }
    }


})

export default userRouter;