import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  isAdmin,
  getAllUsers,
  deleteUser,
  getAllPosts,
  getAllNews,
  deleteNews,
  getAllEvents,
  deleteEvent
} from "../Services/Services";
import { toast } from "react-toastify";
import {
  getPostsByUser,
  getUserById,
  updateUser,
  deletePost,
} from "../Services/Services";
import NavBar from "./NavBar";
import "./Profile.css";

const Profile = () => {
  const [selectedOption, setSelectedOption] = useState("updateProfile");
  const [isAdminUser, setIsAdminUser] = useState(false);

  useEffect(() => {
    isAdmin(localStorage.getItem("userId"))
      .then((data) => {
        setIsAdminUser(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const renderContent = () => {
    switch (selectedOption) {
      case "updateProfile":
        return <UpdateProfile />;
      case "userPosts":
        return <ViewUserPosts />;
      case "manageUsers":
        return <ManageUsers />;
      case "managePosts":
        return <ManagePosts />;
      case "manageNews":
        return <ManageNews />;
      case "manageEvents":
        return <ManageEvents />;
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
              View Your Posts
            </li>
            {isAdminUser && (
              <li onClick={() => setSelectedOption("manageUsers")}>
                Manage Users
              </li>
            )}
            {isAdminUser && (
              <li onClick={() => setSelectedOption("managePosts")}>
                Manage Posts
              </li>
            )}
            {isAdminUser && (
              <li onClick={() => setSelectedOption("manageNews")}>
                Manage News
              </li>
            )}
            {isAdminUser && (
              <li onClick={() => setSelectedOption("manageEvents")}>
                Manage Events
              </li>
            )}
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
    <div className="profile-form-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-form-row">
          <div className="profile-form-group">
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

          <div className="profile-form-group">
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

        <div className="profile-form-row">
          <div className="profile-form-group">
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

          <div className="profile-form-group">
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

        <div className="profile-form-row">
          <div className="profile-form-group">
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

          <div className="profile-form-group">
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

        <div className="profile-form-group">
          <label htmlFor="about">About</label>
          <textarea
            id="about"
            className="profile-textarea"
            name="about"
            value={profileData.about}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          ></textarea>
        </div>

        <button type="submit" className="profile-submit-button">
          Update Profile
        </button>
      </form>
      {showPasswordPopUp && (
        <div className="profile-popup-container">
          <div className="popup">
            <h3>Enter Password</h3>
            <input
              type="password"
              value={profileData.password}
              onChange={handlePasswordChange}
              placeholder="Enter your password"
            />
            <button
              onClick={handleConfirmPassword}
              className="profile-popup-button"
            >
              Confirm
            </button>
            <button
              onClick={() => setShowPasswordPopUp(false)}
              className="profile-popup-close-button"
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
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [totalPosts, setTotalPosts] = useState(0);
  const [pageSize] = useState(10);
  const currentPage = 1;
  let loadingToast;

  useEffect(() => {
    loadingToast = toast.loading("Loading Posts...");
    getPostsByUser(localStorage.getItem("userId")).then((data) => {
      setTotalPosts(data.totalElements);
    });

    getPostsByUser(localStorage.getItem("userId"))
      .then((data) => {
        console.log(data);
        setPosts(data.content);
        toast.dismiss(loadingToast);
      })
      .catch((error) => {
        console.error(error);
        toast.dismiss(loadingToast);
      });
  }, [currentPage, pageSize]);

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      toast.success("Post deleted successfully.");
      getPostsByUser(localStorage.getItem("userId")).then((data) => {
        setTotalPosts(data.totalElements);
      });

      getPostsByUser(localStorage.getItem("userId"))
        .then((data) => {
          console.log(data);
          setPosts(data.content);
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };
  const renderPosts = () => {
    if (totalPosts === 0) {
      return <p>No posts found.</p>;
    }
    return posts.map((post) => (
      <div key={post.postId} className="profile-post-container">
        <h2
          className="post-title"
          onClick={() =>
            navigate(`/blog/${post.postId}/${post.title.replace(/ /g, "-")}`)
          }
        >
          {post.title}
        </h2>
        <h4 className="author-title">Created by: {post.user.name}</h4>
        <p className="post-content">
          {new Date(post.addedDate)
            .toLocaleString({
              day: "2-digit",
              month: "short",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })
            .replace(/:\d{2}\s/, " ")
            .replace(/,/g, " at")}
        </p>
        <button
          className="delete-button"
          onClick={() => handleDeletePost(post.postId)}
        >
          🗑️
        </button>
      </div>
    ));
  };

  const totalPages = Math.ceil(totalPosts / pageSize);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => {
            loadingToast = toast.loading("Loading Posts...");
            getPostsByUser(localStorage.getItem("userId"), i - 1, pageSize)
              .then((data) => {
                setPosts(data.content);
                toast.dismiss(loadingToast);
              })
              .catch((error) => {
                console.error(error);
                toast.dismiss(loadingToast);
              });
          }}
          className={`pagination-button ${currentPage === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="content-box">
      <h2>Your Posts</h2>
      <div>
        {renderPosts()}
        <div className="pagination-controls">{renderPageNumbers()}</div>
      </div>
    </div>
  );
};

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllUsers().then((data) => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const handleDeleteUser = (userId) => {
    deleteUser(userId).then(() => {
      toast.success("User deleted successfully.");
      setUsers(users.filter((user) => user.id !== userId));
    });
  };

  const renderUsers = () => {
    if (loading) {
      return <p>Loading users...</p>;
    }
    if (users.length === 0) {
      return <p>No users found.</p>;
    }
    return users.map((user) => (
      <div key={user.userId} className="profile-post-container">
        <h2>{user.name}</h2>
        <h4>{user.email}</h4>
        <button
          className="delete-button"
          onClick={() => handleDeleteUser(user.id)}
        >
          🗑️
        </button>
      </div>
    ));
  };

  return (
    <div className="content-box">
      <h2>Manage Users</h2>
      <div>{renderUsers()}</div>
    </div>
  );
};

const ManagePosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllPosts().then((data) => {
      console.log(data);
      setPosts(data.content);
      setLoading(false);
    });
  }, []);

  const handleDeletePost = (postId) => {
    deletePost(postId).then(() => {
      toast.success("Post deleted successfully.");
      setPosts(posts.filter((post) => post.postId !== postId));
      getAllPosts().then((data) => {
        console.log(data);
        setPosts(data.content);
        setLoading(false);
      });
    });
  };

  const renderPosts = () => {
    if (loading) {
      return <p>Loading posts...</p>;
    }
    if (posts.length === 0) {
      return <p>No posts found.</p>;
    }
    return posts.map((post) => (
      <div key={post.postId} className="profile-post-container">
        <h2>{post.title}</h2>
        <h4>{post.user ? post.user.name : "Unknown User"}</h4>
        <button
          className="delete-button"
          onClick={() => handleDeletePost(post.postId)}
        >
          🗑️
        </button>
      </div>
    ));
  };

  return (
    <div className="content-box">
      <h2>Manage Posts</h2>
      <div>{renderPosts()}</div>
    </div>
  );
};

const ManageNews = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNews().then((data) => {
      setNews(data);
      setLoading(false);
    });
  }, []);

  const handleDeleteNews = (newsId) => {
    deleteNews(newsId).then(() => {
      toast.success("News deleted successfully.");
      setNews(news.filter((newsItem) => newsItem.newsId !== newsId));
      getAllNews().then((data) => {
        setNews(data);
        setLoading(false);
      });
    });
  };

  const renderNews = () => {
    console.log(news);
    if (loading) {
      return <p>Loading news...</p>;
    }
    if (news.length === 0) {
      return <p>No news found.</p>;
    }
    return news.map((newsItem) => (
      <div key={newsItem.newsId} className="profile-post-container">
        <h2>{newsItem.title}</h2>
        <h4>{newsItem.author ? newsItem.eventOrganizer : "Unknown Author"}</h4>
        <button
          className="delete-button"
          onClick={() => handleDeleteNews(newsItem.id)}
        >
          🗑️
        </button>
      </div>
    ));
  };

  return (
    <div className="content-box">
      <h2>Manage News</h2>
      <div>{renderNews()}</div>
    </div>
  );
};

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllEvents().then((data) => {
      setEvents(data);
      setLoading(false);
    });
  }, []);

  const handleDeleteEvent = (eventId) => {
    deleteEvent(eventId).then(() => {
      toast.success("Event deleted successfully.");
      setEvents(events.filter((event) => event.eventId !== eventId));
      getAllEvents().then((data) => {
        setEvents(data);
        setLoading(false);
      });
    });
  };

  const renderEvents = () => {
    if (loading) {
      return <p>Loading events...</p>;
    }
    if (events.length === 0) {
      return <p>No events found.</p>;
    }
    return events.map((event) => (
      <div key={event.eventId} className="profile-post-container">
        <h2>{event.title}</h2>
        {/* <h4>{event.organizer ? event.organizer : "Unknown Organizer"}</h4> */}
        <button
          className="delete-button"
          onClick={() => handleDeleteEvent(event.eventId)}
        >
          🗑️
        </button>
      </div>
    ));
  };

  return (
    <div className="content-box">
      <h2>Manage Events</h2>
      <div>{renderEvents()}</div>
    </div>
  );
};
export default Profile;
