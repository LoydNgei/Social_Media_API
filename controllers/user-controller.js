import User from '../model/User.js'
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).send("No users found")
        }
        return res.status(200).json({ users })
    } catch (err) {
        console.log(err)
        return res.status(500).send("Internal Server Error")
    }
}

export const signUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User Already Exists!"})
        }
        const saltRounds = 10;
        const hashedPassoword = await bcrypt.hash(password, saltRounds);

        const user = new User({
            name,
            email,
            password: hashedPassoword
        })
        await user.save()
        return res.status(201).json({ user })
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error"})
    }
}


export const Login = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const existingUser= await User.findOne({ email });
        
        if (!existingUser) {
            return res.status(404).json({ message: "User Not Found" })
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Incorrect Password" })
        }
        return res.status(200).json({ message: "Login Successful" })
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" })
    }
}