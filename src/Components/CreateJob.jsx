import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { addJob, getUserById } from "../Services/Services";
import { toast } from "react-toastify";
import "./CreateJob.css";
import NavBar from "./NavBar";

const CreateJob = () => {
  const navigate = useNavigate();
  const [techStack, setTechStack] = useState([]);
  const [techInput, setTechInput] = useState("");
  const [formData, setFormData] = useState({
    postId: "",
    postProfile: "",
    postDesc: "",
    city: "",
    country: "",
    jobUrl: "",
    salaryRange: [],
    userName: "",
    companyName: "",
    postTechStack: [],
    reqExperience: "",
  });

  useEffect(() => {
    getUserById(localStorage.getItem("userId")).then((data) => {
      setFormData({ ...formData, userName: data.name });
    });
  }, []);

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
    formData.postTechStack = techStack;
    formData.salaryRange[0] = parseInt(formData.salaryRange[0]);
    formData.salaryRange[1] = parseInt(formData.salaryRange[1]);
    
    addJob(formData).then(() => {
      toast.success("Job added successfully");
    });
    navigate("/jobs");
  };

  return (
    <div>
      <NavBar />
      <div className="container">
        <h1>Create Job</h1>
        <form onSubmit={handleSubmit}>
          <div className="job-form-group">
            <label className="job-label">Job Title</label>
            <input
              type="text"
              className="job-input"
              name="postProfile"
              value={formData.postProfile}
              onChange={handleChange}
            />
          </div>

          <div className="job-form-group">
            <label className="job-label">Job Description</label>
            <textarea
              className="job-textarea"
              name="postDesc"
              value={formData.postDesc}
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
                value={formData.salaryRange[0] || ""}
                onChange={(e) => {
                  const newSalaryRange = [...formData.salaryRange];
                  newSalaryRange[0] = e.target.value;
                  setFormData({ ...formData, salaryRange: newSalaryRange });
                }}
              />
              <input
                type="text"
                className="job-input"
                placeholder="High"
                name="salaryHigh"
                value={formData.salaryRange[1] || ""}
                onChange={(e) => {
                  const newSalaryRange = [...formData.salaryRange];
                  newSalaryRange[1] = e.target.value;
                  setFormData({ ...formData, salaryRange: newSalaryRange });
                }}
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
              name="reqExperience"
              value={formData.reqExperience}
              onChange={handleChange}
            />
          </div>
          <div className="job-form-group">
            <label className="job-label">Job Application URL</label>
            <input
              type="text"
              className="job-input"
              name="jobUrl"
              value={formData.jobUrl}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="job-submit-button">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
