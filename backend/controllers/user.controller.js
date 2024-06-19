import { User } from "../models/user.model.js";

export const createUser = async(req,res) =>{

    const { fullname, email, password } = req.body;
    try {

        if (!fullname || !email || !password) return res.status(400).json({ msg: "Please fill all fields!" })

        const userExist = await User.findOne({ email })
        if (userExist) return res.status(409).json({success: false, msg: 'User already exist' })

        const user = await User.create({ fullname, email, password })
        // const userData = await user.save()

        return res.status(200).json({success: true, msg: "User created succefully", user })
    } catch (error) {
        return res.status(500).json({success: false, msg: "internal server error" })
    }
}


export const loginUser = async(req,res) =>{

    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ msg: "fields must be required" })

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ msg: "Invalid Email or Password" })

        const isPasswordValid = await user.isPasswordCorrect(password)
        console.log(isPasswordValid);
        if (!isPasswordValid) return res.status(401).json({success: false, msg: "please give right credential" })

        const jwtToken = user.generateAccessToken()

        res.cookie("token", jwtToken);
        res.status(200).json({ success: true, msg: "Login successfully",username: user.fullname, userId:user._id  });
    } catch (error) {
        res.status(400).json({ success: false, msg: "internal server error"})
    }
}


export const logoutUser = async(req,res) =>{
    res.clearCookie('token');  // console.log(token);
    res.status(200).json({ success: true, msg: "User logged out successfully"  });
}

