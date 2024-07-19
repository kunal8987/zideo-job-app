import Recruiter from "../Models/Recuriter.model.js";

export const createRecruiter = async (req, res) => {
    try {
        const { firstName, lastName, email, phone, company } = req.body;

        if (!firstName || !lastName || !email || !phone || !company) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newRecruiter = new Recruiter(req.body);

        await newRecruiter.save();
        res.status(201).json({
            message: "Recruiter created successfully",
            recruiter: newRecruiter,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error creating recruiter controller",
            error: error.message,
        });
    }
};

export const updateRecruiter = async (req, res) => {
    try {
        const { id } = req.params;
        
        const recruiter = await Recruiter.findById(id);

        if (!recruiter) {
            return res.status(404).json({ message: "Recruiter not found" });
        }

        const updateRecruiter = await Recruiter.findByIdAndUpdate(
            id,
            req.body,
            { new: true }
        );

        res.status(200).json({
            message: "Recruiter updated successfully",
            recruiter: updateRecruiter,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error updating recruiter",
            error: error.message,
        });
    }
};


