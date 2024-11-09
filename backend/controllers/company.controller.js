import { Company } from "../model/company.model.js";
import getDataUri from "../utils/datauri.js"
import cloudinary from "../utils/cloudinary.js"

// export const registerCompany = async (req, res) => {
//     try {
//         const { companyName } = req.body;
//         if (!companyName) {
//             return res.status(401).json({
//                 message: "Field is missing",
//                 success: false
//             })
//         }
//         let company = await Company.findOne({ name: companyName });
//         if (company) {
//             return res.status(401).json({
//                 message: "Company already registered with a given name",
//                 success: false
//             })
//         }

//         company = await Company.create({
//             name: companyName,
//             UserId: req.id
//         })

//         return res.status(201).json({
//             message: "Company registered successfully",
//             company,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
export const registerCompany = async (req, res) => {
    try {
        console.log("Authenticated user ID:", req.id);
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is missing",
                success: false
            });
        }

        // Check if company already exists
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "Company already registered with this name",
                success: false
            });
        }

        // Create new company with the authenticated user ID
        company = await Company.create({
            name: companyName,
            UserId: req.id  // req.id should be set from the token in the middleware
        });

        return res.status(201).json({
            message: "Company registered successfully",
            company,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server error", success: false });
    }
};


export const getCompany = async (req, res) => {
    try {
        const UserId = req.id;//logged in user id 
        const companies = await Company.find({ UserId });
        if (companies.length == 0) {

            return res.status(404).json({
                message: "Companies not found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const companies = await Company.findById(companyId);
        if (companies?.length == 0) {
            return res.status(404).json({
                message: "No company found",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        const updateddata = { name, description, website, location, logo };

        const company = await Company.findByIdAndUpdate(req.params.id, updateddata, { new: true });
        if (!company) {
            return res.status(404).json({
                message: "Company not found",
                success: false
            })
        }
        return res.status(200).json({
            message: "Company data updated successfully",
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }

}