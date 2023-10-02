

const asyncHandler = require("express-async-handler");
const bcrypt =  require("bcrypt");
const jwt = require("jsonwebtoken");
const Candidate = require('./../model/userModel');

const userRegistration = asyncHandler(async (req, res) => {
    console.log('User registration form');
    const { username , email, password, confirmationPassword, role } = req.body;

    if (!username || !email || !password || !confirmationPassword || !role) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    if (password !== confirmationPassword) {
        res.status(400);
        throw new Error("Password and Confirmation Password does not match");
    }

    const userAvailable = await Candidate.findOne({email});

    if(userAvailable) {
        res.status(400);
        throw new Error("User already registered");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const hashedCPassword = await bcrypt.hash(confirmationPassword, 10);

    const user = await Candidate.create({
        username,
        email,
        password: hashedPassword,
        confirmationPassword: hashedCPassword,
        role
    });
    if(user) {
        res.status(201).send(user);
    } else {
        res.status(400);
        throw new Error("User data is not valid");
    }
    
});

const userLogin =  asyncHandler(async (req, res) => {
    
    const { email, password } = req.body;
    console.log('email pass', email, password);
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required!");
    }

    const user = await Candidate.findOne({email});
    console.log(user);
    if( user && await (bcrypt.compare(password, user.password)) ) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
                role: user.role
            },
            
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "20m"
        }
        );
        res.status(200).json({accessToken})
    } 
    else {
        res.status(401);
        throw new Error("Email or Password is not valid!");
    }
});

const currentUser = (req, res) => {
    res.send("current user inforation");
};

module.exports = { userRegistration, userLogin, currentUser }