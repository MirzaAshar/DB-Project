import React from "react";
import NavBar from "./NavBar";
import { getJobById } from "../Services/Services";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./SingleJob.css";

const SingleJob = () => {
  const { postId } = useParams();
  const [job, setJob] = useState({});
  let loadingToast;

  useEffect(() => {
    loadingToast = toast.loading("Loading Job...");
    getJobById(postId)
      .then((data) => {
        setJob(data);
        console.log(job);
        toast.dismiss(loadingToast);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [postId]);

  return (
    <div>
      <NavBar />
      <div className="single-job-container">
        <div className="job-details">
          <h2 className="job-title">Job Title: {job.postProfile}</h2>
          <p className="job-description">Job Description:<br /><br />{job.postDesc}</p>
          <p className="job-experience">
          <br />
            Required Experience: {job.reqExperience} years
          </p>
          <div className="job-tech-stack">
            <h3>Tech Stack:</h3>
            <ul>
              {job.postTechStack &&
                job.postTechStack.map((tech, index) => (
                  <li key={index}>{tech}</li>
                ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleJob;
