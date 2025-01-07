// import cloudinary from "../../utils/cloudinary.js";
// import getDataUri from "../../utils/datauri.js";
import { Company } from "../company.model.js";

// Controller to register a new company
export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body; // Extract company name from the request body

        // Validate company name
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false,
            });
        }

        // Check if user ID is present in the request
        if (!req.id) {
            return res.status(401).json({
                message: "Unauthorized. User ID is missing.",
                success: false,
            });
        }

        // Check if the company is already registered
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "This company is already registered.",
                success: false,
            });
        }

        // Register a new company
        company = await Company.create({
            name: companyName,
            userId: req.id, // User ID from the request (requires authentication middleware)
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

// Controller to get all companies registered by the user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // Ensure the user ID is provided by the authentication middleware

        // Find companies associated with the user
        const companies = await Company.find({ userId });
        if (!companies.length) {
            return res.status(404).json({
                message: "No companies found.",
                success: false,
            });
        }

        return res.status(200).json({
            companies,
            success: true,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

// Controller to get a specific company by its ID
export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id; // Extract company ID from request parameters

        // Find the company by ID
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            company,
            success: true,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};

// Controller to update a company's information
export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body; // Extract fields to update

        // Placeholder for cloudinary integration (commented out)
        // const fileUri = getDataUri(file);
        // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        // const logo = cloudResponse.secure_url;

        // Data to update
        const updateData = { name, description, website, location };

        // Update the company in the database
        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Company information updated successfully.",
            company,
            success: true,
        });
    } catch (error) {
        console.error(error); // Log the error for debugging purposes
        res.status(500).json({
            message: "Server error.",
            success: false,
        });
    }
};
