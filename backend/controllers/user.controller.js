import { User } from "../model/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            })
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                message: "User already exist",
                success: true
            })
        }
        const hashpassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password: hashpassword,
            role,
            profile: {
                profilePhoto: cloudResponse.secure_url
            }
        })
        return res.status(201).json({
            message: "Account created successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

// export const login = async (req, res) => {
//     try {
//         const { email, password, role } = req.body;
//         if (!email || !password || !role) {
//             return res.status(400).json({
//                 message: "Something is missing",
//                 success: false
//             })
//         }
//         let user = await User.findOne({ email });
//         if (!user) {
//             return res.status(400).json({
//                 message: "Incorrect email or password",
//                 success: false
//             })
//         }
//         const isPasswordMatch = await bcrypt.compare(password, user.password);
//         if (!isPasswordMatch) {
//             return res.status(400).json({
//                 message: "Incorrect email or password",
//                 success: false
//             })
//         }
//         //check role is correct or not
//         if (role !== user.role) {
//             return res.status(400).json({
//                 message: "Account does not exist with current role",
//                 success: false
//             })
//         }
//         const tokenData = {
//             userId: user._id
//         }
//         const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

//         user = {
//             _id: user._id,
//             fullname: user.fullname,
//             email: user.email,
//             phoneNumber: user.phoneNumber,
//             role: user.role,
//             profile: user.profile
//         }

//         return res.status(200).cookie("token", token, { maxAge: 1 * 24 * 60 * 60 * 1000, httpsOnly: true, sameSite: 'strict' }).json({
//             message: `Welcome back ${user.fullname}`,
//             user,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Something is missing",
                success: false
            });
        }

        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({
                message: "Incorrect email or password",
                success: false
            });
        }

        // Check if the role matches
        if (role !== user.role) {
            return res.status(400).json({
                message: "Account does not exist with current role",
                success: false
            });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        // Setting the cookie with the token
        return res.status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000,  // 1 day
                httpOnly: true,  // Ensures the cookie is not accessible via JS
                secure: process.env.NODE_ENV === 'production',  // Set to true in production (HTTPS)
                sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',  // Change to 'lax' in development for easier testing
            })
            .json({
                message: `Welcome back ${user.fullname}`,
                user,
                success: true
            });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const logout = async (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "Account logout successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updatdeProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, skills, bio } = req.body
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }
        const userId = req.id;//middleware authentication
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({
                message: "User not found.",
                success: false
            })
        }
        // updating data
        if (fullname) user.fullname = fullname
        if (email) user.email = email
        if (phoneNumber) user.phoneNumber = phoneNumber
        if (bio) user.profile.bio = bio
        if (skills) user.profile.skills = skillsArray
        if (cloudResponse) {
            user.profile.resume = cloudResponse.secure_url;// save the cloudinary url
            user.profile.resumeOriginalName = file.originalname;//save the original file name
        }
        user.save();
        user = {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile,
        }
        return res.status(201).json({
            message: "profile updated successfully",
            user,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}