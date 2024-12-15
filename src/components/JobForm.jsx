import { React, Fragment } from "react";

const JobForm = ({formData, setFormData, onSubmit, onReset, buttonLabel}) => {
    // Handles changes in input fields and updates the form data state
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Update form data, splitting and trimming skills if the field is "skillsRequired"
        setFormData({
          ...formData,
          [name]: name === "skillsRequired" ? value.split(",").map(skill => skill.trim()) : value,
        });
      };
  return (
    <Fragment>
        {/* Form for job creation */}
        <form onSubmit={onSubmit}>
                <div>
                    <label>Company Name</label>
                    <input type="text" name="companyName" value={formData.companyName} onChange={handleInputChange} placeholder="Enter your company name here" />
                </div>
                <div>
                    <label>Add logo URL</label>
                    <input type="text" name="addLogoUrl" value={formData.addLogoUrl} onChange={handleInputChange} placeholder="Enter the link" />
                </div>
                <div>
                    <label>Job position</label>
                    <input type="text" name="jobPosition" value={formData.jobPosition} onChange={handleInputChange} placeholder="Enter job position" />
                </div>
                <div>
                    <label>Monthly Salary</label>
                    <input type="number" name="monthlySalary" value={formData.monthlySalary} onChange={handleInputChange} placeholder="Enter amount in rupees" />
                </div>
                <div>
                    <label>Job Type</label>
                    <select name="jobType" value={formData.jobType} onChange={handleInputChange} >
                        <option value="">Select</option>
                        <option value="Full-Time">Full-Time</option>
                        <option value="Part-Time">Part-Time</option>
                        <option value="Contract">Contract</option>
                        <option value="Internship">Internship</option>
                        <option value="Freelance">Freelance</option>
                    </select>
                </div>
                <div>
                    <label>Remote/Office</label>
                    <select name="jobNature" value={formData.jobNature} onChange={handleInputChange} >
                        <option value="">Select</option>
                        <option value="Remote">Remote</option>
                        <option value="Office">Office</option>
                    </select>
                </div>
                <div>
                    <label>Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleInputChange} placeholder="Enter location" />
                </div>
                <div>
                    <label>Job Description</label>
                    <textarea name="jobDescription" value={formData.jobDescription} onChange={handleInputChange} placeholder="Type the Job Description"></textarea>
                </div>
                <div>
                    <label>About Company</label>
                    <textarea name="aboutCompany" value={formData.aboutCompany} onChange={handleInputChange} placeholder="Type about your company"></textarea>
                </div>
                <div>
                    <label>Skills Required</label>
                    <input type="text" name="skillsRequired" value={formData.skillsRequired} onChange={handleInputChange} placeholder="Enter your skills here" />
                </div>
                <div>
                    <label>Information</label>
                    <input type="text" name="information" value={formData.information} onChange={handleInputChange} placeholder="Enter the additional information" />
                </div>
                <div>
                    <button type="button" onClick={onReset}>Cancel</button>
                    <button type="submit">{buttonLabel}</button>
                </div>
            </form>
    </Fragment>
  )
};

export default JobForm;
