import React, { useState } from "react";
import { toast } from "react-toastify";
import "./RegistrationStyle.css";
import { InputField, SelectField } from "./RegField";
import { signUp } from "../../../Services/Services";
import NavBar from "../../NavBar";
import { useNavigate } from "react-router-dom";

let campuses = [
  "Chiniot-Faisalabad",
  "Islamabad",
  "Karachi",
  "Lahore",
  "Peshawar",
];
let programsOffered = ["BS", "MS", "PhD"];
let bsDegrees = [
  "Artificial Intelligence",
  "Business Analytics",
  "Computer Science",
  "Cyber Security",
  "Data Science",
  "Electrical Engineering",
  "Financial Technology",
  "Software Engineering",
];
let msDegrees = [
  "Artificial Intelligence",
  "Business Analytics",
  "Computer Science",
  "Cyber Security",
  "Data Science",
  "Electrical Engineering",
  "Mathematics",
  "Software Engineering",
  "Software Project Management",
];
let phdDegrees = [
  "Computer Science",
  "Electrical Engineering",
  "Software Engineering",
];
let graduationYears = [];

for (let i = new Date().getFullYear(); i >= 2000; i--) {
  graduationYears.push(i);
}

function Registration() {
  const [page, setPage] = useState(1);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    universityID: "",
    cnic: "",
    email: "",
    password: "",
    confirmPassword: "",
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

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    let formatVal = value;

    if (name === "universityID") {
      formatVal = value.replace(/[^0-9KILkil-]/g, "").toUpperCase();

      if (formatVal.length >= 1 && !/\d/.test(formatVal[0])) {
        formatVal = formatVal.substring(1);
      }
      if (formatVal.length >= 2 && !/\d/.test(formatVal[1])) {
        formatVal = formatVal.substring(0, 1) + formatVal.substring(2);
      }
      if (formatVal.length >= 3 && !/[KILkil]/.test(formatVal[2])) {
        formatVal = formatVal.substring(0, 2);
      }
      if (formatVal.length >= 4 && formatVal[4] !== "-") {
        formatVal = formatVal.substring(0, 3) + "-" + formatVal.substring(3);
      }
      if (formatVal.length >= 5 && !/\d/.test(formatVal[4])) {
        formatVal = formatVal.substring(0, 4) + formatVal.substring(5);
      }
      if (formatVal.length >= 6 && !/\d/.test(formatVal[5])) {
        formatVal = formatVal.substring(0, 5) + formatVal.substring(6);
      }
      if (formatVal.length >= 7 && !/\d/.test(formatVal[6])) {
        formatVal = formatVal.substring(0, 6) + formatVal.substring(7);
      }
      if (formatVal.length >= 8 && !/\d/.test(formatVal[7])) {
        formatVal = formatVal.substring(0, 7);
      }

      if (formatVal.length > 8) {
        formatVal = formatVal.substring(0, 8);
      }
    }

    if (name === "cnic") {
      formatVal = value.replace(/[^0-9-]/g, "");

      if (formatVal.length >= 6 && formatVal[5] !== "-") {
        formatVal = formatVal.substring(0, 5) + "-" + formatVal.substring(5);
      }

      if (formatVal.length >= 14 && formatVal[13] !== "-") {
        formatVal = formatVal.substring(0, 13) + "-" + formatVal.substring(13);
      }

      formatVal = formatVal
        .split("")
        .filter((char, index) => {
          if ((index === 5 || index === 13) && char === "-") return true;
          if (index !== 5 && index !== 13 && /\d/.test(char)) return true;
          return false;
        })
        .join("");

      if (formatVal.length > 15) {
        formatVal = formatVal.substring(0, 15);
      }
    }

    setFormData({
      ...formData,
      [name]: files ? files[0] : formatVal,
    });
  };

  const handleNext = () => {
    if (
      !formData.campusLocation ||
      !formData.cnic ||
      !formData.confirmPassword ||
      !formData.currentCity ||
      !formData.currentCountry ||
      !formData.currentDesignation ||
      !formData.currentOrganization ||
      !formData.degreeProgram ||
      !formData.email ||
      !formData.name ||
      !formData.graduationYear ||
      !formData.major ||
      !formData.password ||
      !formData.universityID
    ) {
      toast.error("Please fill out all fields in the form.");
    } else {
      setPage(2);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.about) {
      toast.error("Please write about yourself.");
    } else {
      signUp(formData)
        .then((resp) => {
          console.log(resp);
          toast.success("Registration Successful");
          localStorage.setItem("token", resp.token);
          localStorage.setItem("userId", JSON.stringify(resp.userId));
          setTimeout(() => {
            navigate("/");
          }, 3600);
          setFormData({
            name: "",
            universityID: "",
            cnic: "",
            email: "",
            password: "",
            confirmPassword: "",
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
        })
        .catch((error) => {
          const errorMessage =
            error.response && error.response.data
              ? error.response.data.message
              : "Error! Something Went Wrong";
          toast.error(errorMessage);
          console.log(error);
          console.log(formData);
        });
    }
  };

  return (
    <div>
      <NavBar />
      <div className="form-container">
        {page === 1 && (
          <form>
            <h2>Register Yourself</h2>
            <div className="form-row">
              <InputField
                label="Name"
                name="name"
                type="text"
                placeholder="Enter Full Name..."
                value={formData.name}
                change={handleChange}
                required={true}
              />
              <InputField
                label="CNIC"
                name="cnic"
                type="text"
                placeholder="Enter CNIC..."
                value={formData.cnic}
                change={handleChange}
                required={true}
              />
            </div>
            <div className="form-row">
              <InputField
                label="University ID"
                name="universityID"
                type="text"
                placeholder="Enter NU ID"
                value={formData.universityID}
                change={handleChange}
                required={true}
              />
              <InputField
                label="Email ID"
                name="email"
                type="email"
                placeholder="Enter Email..."
                value={formData.email}
                change={handleChange}
                required={true}
              />
            </div>

            <div className="form-row">
              <InputField
                label="Password"
                name="password"
                type="password"
                placeholder="Enter Password..."
                value={formData.password}
                change={handleChange}
                required={true}
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Enter Confirm Password..."
                value={formData.confirmPassword}
                change={handleChange}
                required={true}
              />
            </div>

            <div className="form-row">
              <SelectField
                label="Campus Location"
                name="campusLocation"
                value={formData.campusLocation}
                placeholderValue="Select Campus"
                change={handleChange}
                required={true}
                data={campuses}
              />
              <SelectField
                label="Graduation Year"
                name="graduationYear"
                value={formData.graduationYear}
                placeholderValue="Select Graduation Year"
                change={handleChange}
                required={true}
                data={graduationYears}
              />
            </div>

            <div className="form-row">
              <SelectField
                label="Degree Program"
                name="degreeProgram"
                value={formData.degreeProgram}
                placeholderValue="Select Degree Program"
                change={handleChange}
                required={true}
                data={programsOffered}
              />
              <SelectField
                label="Degree Major"
                name="major"
                value={formData.major}
                placeholderValue="Select Degree Major"
                change={handleChange}
                required={true}
                data={
                  formData.degreeProgram === ""
                    ? []
                    : formData.degreeProgram === "BS"
                    ? bsDegrees
                    : formData.degreeProgram === "MS"
                    ? msDegrees
                    : phdDegrees
                }
              />
            </div>

            <div className="form-row">
              <InputField
                label="Current Organization"
                name="currentOrganization"
                type="text"
                placeholder="Enter Current Organization..."
                value={formData.currentOrganization}
                change={handleChange}
                required={true}
              />
              <InputField
                label="Current Designation"
                name="currentDesignation"
                type="text"
                placeholder="Enter Current Designation..."
                value={formData.currentDesignation}
                change={handleChange}
                required={true}
              />
            </div>

            <div className="form-row">
              <InputField
                label="Current Country"
                name="currentCountry"
                type="text"
                placeholder="Select Country..."
                value={formData.currentCountry}
                change={handleChange}
                required={true}
              />
              <InputField
                label="Current City"
                name="currentCity"
                type="text"
                placeholder="Select City..."
                value={formData.currentCity}
                change={handleChange}
                required={true}
              />
            </div>

            <div className="form-footer">
              <button
                type="button"
                onClick={handleNext}
                className="submit-button"
              >
                Next
              </button>
            </div>
          </form>
        )}

        {page === 2 && (
          <form onSubmit={handleSubmit}>
            <h2>Upload Photo and Bio</h2>
            <div className="form-row">
              <label htmlFor="about">About:</label>
              <textarea
                name="about"
                placeholder="Describe yourself..."
                value={formData.about}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-footer">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Registration;
