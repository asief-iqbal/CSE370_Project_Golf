import { Application } from '../application.model.js';
import { Job } from '../job.model.js';

// Controller to apply for a job
export const applyJob = async (req, res) => {
    try {
        const userId = req.id; // Get user ID from request
        const jobId = req.params.id; // Get job ID from request parameters

        // Check if job ID is provided
        if (!jobId) {
            return res.status(400).json({
                MessageChannel: "Job id is required.",
                success: false
            });
        };

        // Check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job.",
                success: false
            });
        }

        // Check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        }

        // Create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        // Add the application ID to the job's applications array and save the job
        job.applications.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully.",
            success: true
        });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
    }
};

// Controller to get all jobs applied by a user
export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id; // Get user ID from request

        // Find applications by user ID and populate related job and company details
        const application = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });

        // If no applications are found
        if (!application) {
            return res.status(404).json({
                message: "No Application.",
                success: false
            });
        };

        // Return applications
        return res.status(200).json({
            application,
            success: true
        });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
    }
};

// Admin controller to view all applicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id; // Get job ID from request parameters

        // Find job by ID and populate applications with applicant details
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });

        // If the job is not found
        if (!job) {
            return res.status(404).json({
                message: "Job not found.",
                success: false
            });
        };

        // Return job details including applicants
        return res.status(200).json({
            job,
            success: true
        });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
    }
};

// Controller to update the status of a job application
export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body; // Get the status from request body
        const applicationId = req.params.id; // Get application ID from request parameters

        // Check if status is provided
        if (!status) {
            return res.status(400).json({
                message: "Status is required.",
                success: false
            });
        };

        // Find the application by its ID
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        };

        // Update the application status and save it
        application.status = status.toLowerCase();
        await application.save();

        return res.status(200).json({
            message: "Status updated successfully.",
            success: true
        });
    } catch (error) {
        console.log(error); // Log the error for debugging purposes
    }
};
