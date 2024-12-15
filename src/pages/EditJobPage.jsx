import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import JobForm from "../components/JobForm";
import { updateJob, getJobById } from "../services";

const EditJobPage = () => {
    const {id} = useParams();           // get the id from the header parameter
//          states to manage the job form details
    const [jobDetails, setJobDetails] = useState({
        companyName: '',
        addLogoUrl: '',
        jobPosition: '',
        monthlySalary: '',
        jobType: '',
        jobNature: '',
        location: '',
        jobDescription: '',
        aboutCompany: '',
        skillsRequired: '',
        information: ''
    });

    useEffect(() => {
        if(id) {
            const fetchJobById = async () => {
                const res = await getJobById(id);
                if(res.status === 200) {
                    const data = await res.json();
                    setJobDetails(data);
                } else {
                    console.log(data);
                }
            }
            fetchJobById();
        }
    }, [id]);

    //                      function for update the job
    const handleUpdateJob = async (e) => {
        e.preventDefault()
            const res = await updateJob(id, jobDetails)
            if (res.status === 200) {
                const data = await res.json()
                console.log(data)
                setJobDetails({
                    companyName: '',
                    addLogoUrl: '',
                    jobPosition: '',
                    monthlySalary: '',
                    jobType: '',
                    jobNature: '',
                    location: '',
                    jobDescription: '',
                    aboutCompany: '',
                    skillsRequired: '',
                    information: ''
                });
                alert("Job Updated successfully");
            } else if (res.status === 401) {
                alert('login to update this job')
            } else {
                console.log(res)
                alert('error')
            }
    }

    //              function for reset the job form
    const handleReset = () => {
        setJobDetails({
            companyName: '',
            addLogoUrl: '',
            jobPosition: '',
            monthlySalary: '',
            jobType: '',
            jobNature: '',
            location: '',
            jobDescription: '',
            aboutCompany: '',
            skillsRequired: '',
            information: ''
        });                                         // Reset the state to initial values
    };

    return (
        <div className="flex dir-row">
            <div>
            <h1>Add Job Description</h1>
            {/* Form for job creation */}
            <JobForm formData={jobDetails} setFormData={setJobDetails} onSubmit={handleUpdateJob} onReset={handleReset} buttonLabel={"Update"} />
            </div>
        </div>
    );
};

export default EditJobPage;
