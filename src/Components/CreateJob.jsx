import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CreateJob.css";
import NavBar from "./NavBar";

const CreateJob = () => {
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [formData, setFormData] = useState({
    jobTitle: "",
    jobDescription: "",
    city: "",
    country: "",
    salaryLow: "",
    salaryHigh: "",
    companyName: "",
    jobMode: "Onsite",
    techStack: [],
    requiredExperience: "",
  });

  const handleAddTech = () => {
    if (techInput.trim() !== "") {
      setTechStack([...techStack, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleRemoveTech = (index) => {
    setTechStack(techStack.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    formData.techStack = techStack;
    console.log(formData);
  };

  return (
    <div className="container">
      <h1>Create Job</h1>
      <form onSubmit={handleSubmit}>
        <div className="job-form-group">
          <label className="job-label">Job Title</label>
          <input
            type="text"
            className="job-input"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
          />
        </div>

        <div className="job-form-group">
          <label className="job-label">Job Description</label>
          <textarea
            className="job-textarea"
            name="jobDescription"
            value={formData.jobDescription}
            onChange={handleChange}
          ></textarea>
        </div>

        <div className="job-form-group">
          <label className="job-label">City</label>
          <input
            type="text"
            className="job-input"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </div>

        <div className="job-form-group">
          <label className="job-label">Country</label>
          <input
            type="text"
            className="job-input"
            name="country"
            value={formData.country}
            onChange={handleChange}
          />
        </div>

        <div className="job-form-group">
          <label className="job-label">Salary Range</label>
          <div className="salary-inputs">
            <input
              type="text"
              className="job-input"
              placeholder="Low"
              name="salaryLow"
              value={formData.salaryLow}
              onChange={handleChange}
            />
            <input
              type="text"
              className="job-input"
              placeholder="High"
              name="salaryHigh"
              value={formData.salaryHigh}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="job-form-group">
          <label className="job-label">Company Name</label>
          <input
            type="text"
            className="job-input"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="job-form-group">
          <label className="job-label">Job Mode</label>
          <select
            className="job-select"
            name="jobMode"
            value={formData.jobMode}
            onChange={handleChange}
          >
            <option>Onsite</option>
            <option>Remote</option>
            <option>Hybrid</option>
          </select>
        </div>

        <div className="job-form-group">
          <label className="job-label">Tech Stack</label>
          <div className="salary-inputs">
            <input
              type="text"
              className="job-input"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
            />
            <button
              type="button"
              className="job-submit-button"
              onClick={handleAddTech}
            >
              Add
            </button>
          </div>
          <div className="tags-container">
            {techStack.map((tech, index) => (
              <span key={index} className="tag">
                {tech}
                <button
                  type="button"
                  className="delete-tag-button"
                  onClick={() => handleRemoveTech(index)}
                >
                  x
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className="job-form-group">
          <label className="job-label">Required Experience</label>
          <input
            type="text"
            className="job-input"
            name="requiredExperience"
            value={formData.requiredExperience}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="job-submit-button">
          Create Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
