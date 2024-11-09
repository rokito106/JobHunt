import { Application } from "../model/application.model.js";
import { Job } from "../model/job.model.js";

export const applyJob=async(req,res)=>{
    try {
        const UserId=req.id;
        const jobId=req.params.id;
        if(!jobId){
            return res.status(404).json({
                message:"Job Id is missing",
                success:false
            })
        }
        if (!UserId) {
            console.log("User ID is missing in the request.");
            return res.status(400).json({
                message: "User ID is missing",
                success: false
            });
        }

        const existingApplicant=await Application.findOne({job:jobId , applicant:UserId});
        if(existingApplicant){
            return res.status(404).json({
                message:"You already applied for this job",
                success:false
            })
        }
        const job=await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"No jobs found",
                success:false
            })
        }
        const newApplication=await Application.create({
            job:jobId,
            applicant:UserId
        })
        job.applications.push(newApplication._id);
        await job.save();
        return res.status(201).json({
            message:"Job applied successfully",
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        console.log("User ID:", userId);

        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: "job",
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } },
                }
            });

        console.log("Applications:", applications);

        if (applications.length === 0) {
            return res.status(404).json({
                message: "No applications found",
                success: false
            });
        }

        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.log("Error fetching applied jobs:", error);
        return res.status(500).json({
            message: "An error occurred while fetching applied jobs",
            success: false
        });
    }
}

export const getApplicant=async(req,res)=>{
    try {
        const jobId=req.params.id;
        const job=await Job.findById(jobId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:"applicant"
            }
        })
        if(!job){
            return res.status(404).json({
                message:"No Job found",
                success:false
            })
        }
        return res.status(200).json({
            job,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateStatus=async(req,res)=>{
    try {
        const applicationId=req.params.id;
        const {status}=req.body;
        if(!status){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }
        const application=await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"No apllication found",
                success:false
            })
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully",
            success:true
    })

    } catch (error) {
        console.log(error);
    }
}