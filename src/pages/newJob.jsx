import {useState } from 'react'
import JobForm from '../components/JobForm'         //import JobForm
import { createJob } from '../services'

export default function NewJob() {
    const [jobformData, setJobformData] = useState({
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
    })

    //              function for creating a job
    const handleCreateJob = async (e) => {
        e.preventDefault();                     // Prevent default form submission
        const res = await createJob(jobformData);  // API call to add a job
        if(res.status === 200) {                 // If the request is successful
            const data = await res.json();
            console.log(data);                   // Log the response data for debugging
            setJobformData({
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
            });                                 // Reset form fields after successful submission
            alert("Job created successfully");      // Notify user
        } else if (res.status === 401) {            // If the user is not authenticated
            alert("Login to create a job");
        } else {                                    // Handle other errors
            console.log(res);                       // Log the error response
            alert("error");
        }
    };
    //              function for reset the job form
    const handleReset = () => {
        setJobformData({
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
        <div>
            <h1>New Job</h1>
            <JobForm formData={jobformData} setFormData={setJobformData} onSubmit={handleCreateJob} onReset={handleReset} buttonLabel={"+ Add Job"} />
        </div>
    )
}