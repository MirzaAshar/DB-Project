import React, { useState, useEffect } from "react";
import "./Profile.css"; // Assuming this CSS file for styling
import NavBar from "./NavBar";
import { getPostsByUser, getUserById } from "../Services/Services";
import { updateUser } from "../Services/Services";
import { toast } from "react-toastify";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("updateProfile");

  const renderContent = () => {
    switch (selectedOption) {
      case "updateProfile":
        return <UpdateProfile />;
      case "userPosts":
        return <ViewUserPosts />;
      case "userJobPostings":
        return <ViewUserJobPostings />;
      case "userComments":
        return <ViewUserComments />;
      default:
        return (
          <div className="content-box">
            Select an option from the left pane.
          </div>
        );
    }
  };

  return (
    <div>
      <NavBar />
      <div className="profile-page">
        <div className="left-pane">
          <h3>Profile Options</h3>
          <ul>
            <li onClick={() => setSelectedOption("updateProfile")}>
              Update Profile
            </li>
            <li onClick={() => setSelectedOption("userPosts")}>
              View User Posts
            </li>
            <li onClick={() => setSelectedOption("userJobPostings")}>
              View User Job Postings
            </li>
            <li onClick={() => setSelectedOption("userComments")}>
              View User Comments
            </li>
          </ul>
        </div>
        <div className="right-pane">{renderContent()}</div>
      </div>
    </div>
  );
};

const UpdateProfile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    universityID: "",
    cnic: "",
    email: "",
    password: "",
    confirmpassword: "",
    currentOrganization: "",
    currentDesignation: "",
    currentCountry: "",
    currentCity: "",
    campusLocation: "",
    graduationYear: "",
    degreeProgram: "",
    major: "",
    about: "",
  });
  const [showPasswordPopUp, setShowPasswordPopUp] = useState(false);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    getUserById(userId).then((user) => {
      setProfileData({
        name: user.name ? user.name : "",
        email: user.email ? user.email : "",
        universityID: user.universityID ? user.universityID : "",
        cnic: user.cnic ? user.cnic : "",
        campusLocation: user.campusLocation ? user.campusLocation : "",
        graduationYear: user.graduationYear ? user.graduationYear : "",
        degreeProgram: user.degreeProgram ? user.degreeProgram : "",
        major: user.major ? user.major : "",
        currentOrganization: user.currentOrganization
          ? user.currentOrganization
          : "",
        currentDesignation: user.currentDesignation
          ? user.currentDesignation
          : "",
        currentCountry: user.currentCountry ? user.currentCountry : "",
        currentCity: user.currentCity ? user.currentCity : "",
        about: user.about ? user.about : "",
        password: "",
        confirmpassword: "",
      });
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowPasswordPopUp(true);
  };

  const handlePasswordChange = (e) => {
    setProfileData({
      ...profileData,
      password: e.target.value,
      confirmpassword: atob(localStorage.getItem("hashedPassword")),
    });
  };

  const handleConfirmPassword = () => {
    setShowPasswordPopUp(false);
    if (profileData.password === atob(localStorage.getItem("hashedPassword"))) {
      console.log(profileData);
      updateUser(localStorage.getItem("userId"), profileData)
        .then((response) => {
          if (response) {
            toast.success("Profile updated successfully.");
          }
        })
        .catch(() => {
          toast.error("Unexpected error occurred. Please try again.");
        });
    } else {
      toast.error("Error: Password does not match.");
    }
    setProfileData({ ...profileData, password: "" });
  };

  return (
    <div className="form-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={profileData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentOrganization">Current Organization</label>
            <input
              type="text"
              id="currentOrganization"
              name="currentOrganization"
              value={profileData.currentOrganization}
              onChange={handleChange}
              placeholder="Enter your organization"
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentDesignation">Current Designation</label>
            <input
              type="text"
              id="currentDesignation"
              name="currentDesignation"
              value={profileData.currentDesignation}
              onChange={handleChange}
              placeholder="Enter your designation"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="currentCountry">Current Country</label>
            <input
              type="text"
              id="currentCountry"
              name="currentCountry"
              value={profileData.currentCountry}
              onChange={handleChange}
              placeholder="Enter your country"
            />
          </div>

          <div className="form-group">
            <label htmlFor="currentCity">Current City</label>
            <input
              type="text"
              id="currentCity"
              name="currentCity"
              value={profileData.currentCity}
              onChange={handleChange}
              placeholder="Enter your city"
            />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            name="about"
            value={profileData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">
          Update Profile
        </button>
      </form>
      {showPasswordPopUp && (
        <div className="popup-container">
          <div className="popup">
            <h3>Enter Password</h3>
            <input
              type="password"
              className="popup-input"
              value={profileData.password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            <button onClick={handleConfirmPassword} className="popup-button">
              Confirm
            </button>
            <button
              onClick={() => setShowPasswordPopUp(false)}
              className="popup-close-button"
            >
              x
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const ViewUserPosts = () => {
//   useEffect(() => {
//     getPostsByUser(localStorage.getItem("userId")).then((posts) => {
//       console.log(posts);
//     });
//   }, []);
  return (
    <div className="content-box">
      <h2>User Posts</h2>
      <p>Here are all the posts made by the user.</p>
    </div>
  );
};

const ViewUserJobPostings = () => {
  return (
    <div className="content-box">
      <h2>User Job Postings</h2>
      <p>Here are all the job postings created by the user.</p>
    </div>
  );
};

const ViewUserComments = () => {
  return (
    <div className="content-box">
      <h2>User Comments</h2>
      <p>Here are all the comments made by the user.</p>
    </div>
  );
};

export default Profile;
