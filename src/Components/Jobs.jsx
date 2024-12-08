import React, { useEffect } from "react";
import NavBar from "./NavBar";
import { getAllJobs } from "../Services/Services";
import "./Jobs.css"

const Jobs = () => {
  const [jobs, setJobs] = React.useState([]);

  useEffect(() => {
    getAllJobs()
      .then((data) => {
        console.log(data);
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  useEffect(() => {
    getAllJobs()
      .then((data) => {
        setJobs(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="jobs-container">
        <div className="jobs-grid">
        {jobs.map((job) => (
          <div key={job.postId} className="job-card">
            <h2 className="job-title">{job.postProfile}</h2>
            <p className="job-desc">{job.postDesc}</p>
            <p className="job-tech-stack">Tech Stack: {job.postTechStack.join(", ")}</p>
            <p className="job-experience">Required Experience: {job.reqExperience} years</p>
          </div>
        ))}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
