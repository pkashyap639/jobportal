const Application = require("../models/Application");
const JobListing = require("../models/JobListing");
const User = require("../models/User")
const mongoose = require("mongoose");

module.exports = {
    apply: async function (req, res){
        console.log("--Accessing apply for job");
        /*
        Mock Data
        {
            "jobId": "60c72b2f5f1b2c001c8e4c2b",
            "userId": "60c72b2f5f1b2c001c8e4c2b"
        }
        */
        try{
            const application = new Application(req.body);

            //check if jobList and user exists
            const jobListingExists = await JobListing.exists({_id: req.body.jobId});
            const userExists = await User.exists({_id: req.body.userId});
            if(!jobListingExists || !userExists){
                return res.status(400).send({error: "Not valid input"});
            }
            await Application.create(application);
            res.status(201).send(application);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    getApplicationByUser: async function (req, res){
        //shows all applications and jobdetails where the user applied
        console.log("--Accessing get Application by User Id");
        try{
            //from URL http://localhost:3000/appliedJobs?user=<userId>
            //And cast into object ID
            const userId = mongoose.Types.ObjectId.createFromHexString(req.query.user); 
            const result = await Application.aggregate([
                {$match: {userId}},
                {$lookup: {
                    from: "joblistings",
                    localField: "jobId",
                    foreignField: "_id",
                    as: "jobdetails"
                }}
            ]);
            res.status(201).send(result);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    getApplicationsByJob: async function (req, res){
        //shows all applications for a joblisted
        console.log("--Accessing get Application by Job Id");
        try{
            //from URL http://localhost:3000/job/applicants?jobId=<jobId>
            //And cast into object ID
            const jobId = mongoose.Types.ObjectId.createFromHexString(req.query.jobId); 
            const result = await Application.aggregate([
                {$match: {jobId}},
                {$lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "result"
                }}
            ]);
            res.status(201).send(result);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    changeStatus: async function (req, res){
        console.log("--Accessing change application status");
        /*
        Mock Data
        {
            "applicationId": "60c72b2f5f1b2c001c8e4c2b",
            "status": "cancelled"
        }
        */
        try{
            const applicationIdFromReq = req.body.applicationId;
            const newStatus = req.body.status;
            const updated = await Application.findOneAndUpdate(
                {_id: applicationIdFromReq},
                {status: newStatus}, //change status only
                {
                    returnDocument: "after",
                    runValidators: true //enforce enum criteria
                }
            );
            res.status(201).send(updated);
        }catch (err){
            res.status(500).send({error: err.message});
        }
    }
}

