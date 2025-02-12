const express = require('express')
const z = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const authMiddleware = require('../middleware');
const router = express.Router();
const bcrypt = require('bcryptjs');

const signupSchema = z.object({
    username: z.string().email().min(3).max(40),
    firstName: z.string().min(1).max(50),
    lastName: z.string().min(1).max(50),
    password: z.string().min(6)
})



router.post('/signup', async (req, res) => {
    const body = req.body;
    const { success } = signupSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        });
    }

    const existingUser = await User.findOne({ username: body.username });
    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken"
        });
    }

    // Hash the password before saving it to the database
    const hashedPassword = await bcrypt.hash(body.password, 10);

    const dbUser = await User.create({
        ...body,
        password: hashedPassword
    });
    const userId = dbUser._id;

    await Account.create({
        userId: userId,
        balance: 1 + Math.random() * 10000
    });

    const token = jwt.sign({
        userId: userId,
    }, JWT_SECRET);

    res.status(200).json({
        message: 'User created successfully!',
        token: token
    });
});


const signInSchema = z.object({
    username: z.string().email().min(3).max(40),
    password: z.string().min(6)
})


router.post('/signin', async (req, res) => {
    const body = req.body;
    const { success } = signInSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: 'Incorrect inputs'
        });
    }

    const userExist = await User.findOne({ username: body.username });

    if (userExist) {
        // Compare the hashed password with the entered password
        const isMatch = await bcrypt.compare(body.password, userExist.password);

        if (isMatch) {
            const token = jwt.sign({
                userId: userExist._id
            }, JWT_SECRET);

            return res.json({
                token: token
            });
        } else {
            return res.status(411).json({
                message: 'Incorrect username or password'
            });
        }
    }

    return res.status(411).json({
        message: 'Incorrect username or password'
    });
});


// update details put route
const updateSchema = z.object({
    firstName: z.string().min(1).max(50).optional(),
    lastName: z.string().min(1).max(50).optional(),
    password: z.string().min(6).optional()
})

router.put('/', authMiddleware, async (req, res) => {
    //check that new updated value is as per the schema or not
    const { success } = updateSchema.safeParse(req.body);
    const userId = req.userId;

    if (!success) {
        res.status(411).json({
            message: 'Error while updating information'
        })
    }

    //updated new value in the database
    await User.updateOne({
        _id: userId
    }, req.body)

    return res.json({
        message: 'Updated successfully!'
    })
})

// Update User Profile Route
// Update User Profile Route
router.put('/profile', authMiddleware, async (req, res) => {
    const { success } = updateSchema.safeParse(req.body);
    const userId = req.userId;

    if (!success) {
        return res.status(411).json({
            message: 'Error while updating information'
        });
    }

    // Update user details in the database
    await User.updateOne(
        { _id: userId },
        { 
            $set: {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                username: req.body.username
            }
        }
    );

    return res.json({
        message: 'Updated successfully!'
    });
});




router.get('/bulk', async (req, res) => {
    const filter = req.query.filter || '';

    const usersFind = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options": "i" // Add the "i" option for case-insensitive search
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options": "i"
            }
        }]
    });

    res.json({
        user: usersFind.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/profile', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.userId).select('-password'); // Исключаем пароль из ответа

        if (!user) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error'
        });
    }
})

module.exports = router;