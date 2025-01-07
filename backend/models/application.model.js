import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Job", // Reference to the Job collection
            required: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Reference to the User collection
            required: true,
        },
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected"], // Allowed values for status
            default: "pending", // Default value
        },
    },
    { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Compound index to ensure unique applications per job and applicant
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

// Static method to find applications by job ID
applicationSchema.statics.findByJob = function (jobId) {
    return this.find({ job: jobId }).populate("applicant").exec();
};

// Static method to find applications by applicant ID
applicationSchema.statics.findByApplicant = function (applicantId) {
    return this.find({ applicant: applicantId }).populate("job").exec();
};

// Export the Application model
export const Application = mongoose.model("Application", applicationSchema);
