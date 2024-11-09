import { Job } from "../model/job.model.js";

export const postJob = async (req, res) => {
    try {
        const { title, description, location, position, experience, salary, requirements, jobType, companyId } = req.body;
        const UserId = req.id;
        if (!title || !description || !location || !position || !experience || !salary || !requirements || !jobType || !companyId) {
            return res.status(404).json({
                message: "Something is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(','),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            createdBy: UserId
        })

        return res.status(201).json({
            message: "Job created successfully",
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}

export const getAllJob = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                {
                    title: {
                        $regex: keyword,
                        $options: "i"
                    }
                },
                {
                    description: {
                        $regex: keyword,
                        $options: "i"
                    }
                }
            ]
        };
        const jobs = await Job.find(query).populate({
            path: "company"
        }).sort({ createdAt: -1 });
        if (!jobs) {
            res.status(400).json({
                message: "No Job find",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications"
        });
        if (!job) {
            return res.status(404), json({
                message: "No job found",
                success: false
            })
        }
        return res.status(200).json({
            job,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const adminJobs = async (req, res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({ createdBy: adminId }).populate({
            path: "company"
        });
        if (jobs.length == 0) {
            return res.status(404).json({
                message: "Jobs not found",
                success: false
            })
        }
        return res.status(200).json({
            jobs,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}