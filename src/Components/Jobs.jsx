import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";
import { toast } from "react-toastify";
import { getAllJobs } from "../Services/Services";
import "./Jobs.css";

const Jobs = () => {
  const navigate = useNavigate();
  const [jobs, setJobs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);
  const jobsPerPage = 12;
  let loadingToast;

  useEffect(() => {
    loadingToast = toast.loading("Loading Jobs...");
    setLoading(true);
    getAllJobs()
      .then((data) => {
        console.log(data);
        setLoading(false);
        setJobs(data);
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    navigate(`/jobs?page=${currentPage}`);
  }, [currentPage, navigate]);

  const handleClick = (job) => {
    navigate(`/jobs/job-post/${job.postId}`);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
      pageNumbers.push(i);
    }
    return pageNumbers.map((number) => (
      <button
        key={number}
        onClick={() => handlePageChange(number)}
        className="page-number"
      >
        {number}
      </button>
    ));
  };

  return (
    <div>
      <NavBar />
      {loading ? (
        <div></div>
      ) : (
        <div className="jobs-container">
          {toast.dismiss(loadingToast)}
          <h1>Job Postings</h1>
          <div className="jobs-grid">
            {currentJobs.map((job) => (
              <div
                key={job.postId}
                className="job-card"
                onClick={() => handleClick(job)}
              >
                <h2 className="job-title">{job.postProfile}</h2>
                <p className="job-desc">{job.postDesc}</p>
                <p className="job-tech-stack">
                  Tech Stack: {job.postTechStack.join(", ")}
                </p>
                <p className="job-experience">
                  Required Experience: {job.reqExperience} years
                </p>
              </div>
            ))}
          </div>
          <div className="pagination">{renderPageNumbers()}</div>
          <div className="add-job-button-container">
            <button
              className="add-job-button"
              onClick={() => {
                if(localStorage.getItem("token") === null){
                  toast.error("Please login to add job");
                  return;
                }
                navigate("/jobs/add-job")}}
            >
              Add Job
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Jobs;
