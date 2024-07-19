import Candidate from "../Models/Candidate.model.js";

// CREATE CANDIDATE FUNCTION

export const createCandidate = async (req, res) => {
    try {
        const { name, email, phone, state, city, about, skills } = req.body;

        // VALIDATE REQUEST BODY
        if (!name || !email || !phone || !state || !city || !about || !skills) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // CHECK IF CANDIDATE ALREADY EXISTS
        const existingCandidate = await Candidate.findOne({ email });
        if (existingCandidate) {
            return res
                .status(400)
                .json({ message: "Candidate already exists" });
        }

        // CREATE NEW CANDIDATE
        const newCandidate = new Candidate(req.body);

        // SAVE CANDIDATE TO DATABASE
        await newCandidate.save();

        res.status(201).json({
            message: "Candidate created successfully",
            candidate: newCandidate,
        });
    } catch (error) {
        console.error("Error creating candidate controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE CANDIDATE FUNCTION

export const updateCandidate = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, phone, state, city, about, skills } = req.body;

        // FIND CANDIDATE BY ID
        const candidate = await Candidate.findById(id);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // UPDATE CANDIDATE DETAILS
        let updateCandidate = await Candidate.findByIdAndUpdate(id, req.body, {
            new: true,
        });

        // SAVE UPDATED CANDIDATE TO DATABASE
        // await candidate.save();

        res.status(200).json({
            message: "Candidate updated successfully",
            updateCandidate,
        });
    } catch (error) {
        console.error("Error updating candidate controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

// CREATE EDUCATION FUNCTION

export const createEducation = async (req, res) => {
    try {
        const { institution, degree, fieldOfStudy, startDate, endDate } =
            req.body;

        // VALIDATE REQUEST BODY
        if (!institution || !degree || !fieldOfStudy || !startDate) {
            return res
                .status(400)
                .json({ message: "All fields except endDate are required" });
        }

        // FIND CANDIDATE BY ID
        const candidate = await Candidate.findOne({ authId: req.user.authId });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // CREATE NEW EDUCATION OBJECT
        const newEducation = {
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
        };

        // ADD NEW EDUCATION TO CANDIDATE'S EDUCATION ARRAY
        candidate.education.push(newEducation);

        // SAVE UPDATED CANDIDATE TO DATABASE
        await candidate.save();

        res.status(201).json({
            message: "Education added successfully",
            candidate,
        });
    } catch (error) {
        console.error("Error creating education controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

// UPDATE EDUCATION FUNCTION

export const updateEducation = async (req, res) => {
    try {
        const { id } = req.params;
        const { institution, degree, fieldOfStudy, startDate, endDate } =
            req.body;

        // FIND CANDIDATE BY ID
        const candidate = await Candidate.findOne({ authId: req.user.authId });
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // FIND EDUCATION BY ID
        const education = candidate.education._id(id);
        if (!education) {
            return res.status(404).json({ message: "Education not found" });
        }

        // UPDATE EDUCATION FIELDS
        education.institution = institution;
        education.degree = degree;
        education.fieldOfStudy = fieldOfStudy;
        education.startDate = startDate;
        education.endDate = endDate;

        // SAVE UPDATED CANDIDATE TO DATABASE
        await candidate.save();

        res.status(200).json({
            message: "Education updated successfully",
            candidate,
        });
    } catch (error) {
        console.error("Error updating education controller", error);
        res.status(500).json({ message: "Server error" });
    }
};


// CREATE EXPERIENCE FUNCTION 

export const createExperience = async (req, res) => {
    try {
        const { title, company, startDate, endDate } = req.body;

        // VALIDATE REQUEST BODY
        if ( !title || !company || !startDate) {
            return res
                .status(400)
                .json({ message: "All fields except endDate are required" });
        }

        // FIND CANDIDATE BY ID
        const candidate = await Candidate.findOne({authId:req.user.authId});
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // CREATE NEW EXPERIENCE
        const newExperience = {
            title,
            company,
            startDate,
            endDate,
        };

        // ADD EXPERIENCE TO CANDIDATE
        candidate.experience.push(newExperience);

        // SAVE UPDATED CANDIDATE TO DATABASE
        await candidate.save();

        res.status(200).json({
            message: "Experience added successfully",
            candidate,
        });
    } catch (error) {
        console.error("Error creating experience controller", error);
        res.status(500).json({ message: "Server error" });
    }
};

//UPDATE EXPERIENCE FUNCTION 

export const updateExperience = async (req, res) => {
    try {
        const {
            candidateId,
            experienceId,
            title,
            company,
            startDate,
            endDate,
        } = req.body;

        // VALIDATE REQUEST BODY
        if (!candidateId || !experienceId || !title || !company || !startDate) {
            return res
                .status(400)
                .json({ message: "All fields except endDate are required" });
        }

        // FIND CANDIDATE BY ID
        const candidate = await Candidate.findById(candidateId);
        if (!candidate) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        // FIND EXPERIENCE BY ID
        const experienceIndex = candidate.experience.findIndex(
            (exp) => exp.id === experienceId
        );
        if (experienceIndex === -1) {
            return res.status(404).json({ message: "Experience not found" });
        }

        // UPDATE EXPERIENCE
        candidate.experience[experienceIndex] = {
            ...candidate.experience[experienceIndex],
            title,
            company,
            startDate,
            endDate,
        };

        // SAVE UPDATED CANDIDATE TO DATABASE
        await candidate.save();

        res.status(200).json({
            message: "Experience updated successfully",
            candidate,
        });
    } catch (error) {
        console.error("Error updating experience controller", error);
        res.status(500).json({ message: "Server error" });
    }
};
