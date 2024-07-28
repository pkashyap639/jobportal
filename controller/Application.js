const Application = require("../models/Application");
const mongoose = require("mongoose");

module.exports = {
    apply: async function (req, res){
        console.log("--Accessing apply for job");
        /*
        Mock Data
        {
            "jobId": "1",
            "userId": "1",
        }
        */
        try{
            const application = new Application(req.body);
            await Application.create(application);
            res.status(201).send(application);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    getApplicationByUser: async function (req, res){
        console.log("--Accessing get Application by User Id");
        try{
            const userIdFromReq = req.query.user; //from URL http://localhost:3000/appliedJobs?user=1
            const result = await Application.find({userId: userIdFromReq});
            res.status(201).send(result);
        } catch (err){
            res.status(500).send({error: err.message});
        }
    },

    getApplicationsByJob: async function (req, res){
        console.log("--Accessing get Application by Job Id");
        try{
            const jobIdFromReq = req.query.jobId; //from URL http://localhost:3000/job/applicants?jobId=1
            const result = await Application.find({jobId: jobIdFromReq});
            console.log(result);
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
            "applicationId": "1",
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

