import { User } from "../user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;

        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const file = req.file
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists with this email.", success: false });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ fullname, email, phoneNumber, password: hashedPassword, role });

        return res.status(201).json({ message: "Account created successfully.", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

//User login
export const login = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "All fields are required.", success: false });
        }

        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Incorrect email or password.", success: false });
        }

        if (role !== user.role) {
            return res.status(400).json({ message: "Role mismatch.", success: false });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: "1d" });

        return res.status(200)
            .cookie("token", token, { maxAge: 24 * 60 * 60 * 1000, httpOnly: true, sameSite: "strict" })
            .json({ message: `Welcome back, ${user.fullname}`, user, success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

//logout

// User Logout
export const logout = (req, res) => {
    try {
        res.clearCookie("token", { httpOnly: true, sameSite: "strict" }); // Clear the token cookie
        return res.status(200).json({
            message: "Logout successful.",
            success: true,
        });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({
            message: "Server error during logout.",
            success: false,
        });
    }
};


//update profile

export const updateProfile = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, bio, skills } = req.body;

        const file = req.file;
        const userId = req.userId; // Middleware should set req.userId

        if (!userId) {
            return res.status(401).json({ message: "User ID is missing. Authentication required.", success: false });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found.", success: false });
        }

        // Parse skills if provided
        const skillArray = skills ? skills.split(",") : undefined;

        // Update user properties
        if (fullname) user.fullname = fullname;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skills) user.profile.skills = skillArray;

        await user.save(); // Save updated user

        res.status(200).json({
            message: "Profile updated successfully.",
            user,
            success: true,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error", success: false });
    }
};

