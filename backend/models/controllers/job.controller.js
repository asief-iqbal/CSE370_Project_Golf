import { Job } from "../job.model.js";

// Admin posts a new job
export const postJob = async (req, res) => {
    try {
        const {
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            experience,
            position,
            companyId,
        } = req.body; // Extract job details from the request body

        const userId = req.id; // User ID from authentication middleware

        // Validate required fields
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !experience ||
            !position ||
            !companyId
        ) {
            return res.status(400).json({
                message: "Something is missing.",
                success: false,
            });
        }

        // Create a new job posting
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","), // Convert requirements string to an array
            salary: Number(salary), // Ensure salary is stored as a number
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: userId, // Admin who created the job
        });

        return res.status(201).json({
            message: "New job created successfully.",
            job,
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

// Students fetch all jobs
export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""; // Get keyword from query parameters

        // Build query to search jobs by title or description
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };

        // Fetch jobs matching the query, sorted by creation date
        const jobs = await Job.find(query)
            .populate({ path: "company" }) // Populate company details
            .sort({ createdAt: -1 });

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
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

// Students fetch a job by its ID
export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id; // Get job ID from request parameters

        // Find the job by ID
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false,
            });
        }

        return res.status(200).json({
            job,
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

// Admin fetches all jobs they have created
export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id; // Admin ID from authentication middleware

        // Find jobs created by the admin
        const jobs = await Job.find({ created_by: adminId })
            .populate({ path: "company" }) // Populate company details
            .sort({ createdAt: -1 }); // Sort jobs by creation date

        if (!jobs.length) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false,
            });
        }

        return res.status(200).json({
            jobs,
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
