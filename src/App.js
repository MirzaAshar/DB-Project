import Resistration from "./Components/Form/SignUp/Registration"
import Login from "./Components/Form/SignIn/Login";
import Home from "./Components/Home";
import AlumniDirectory from "./Components/AlumniDirectory";
import EventDetails from "./Components/Event/EventDetails";
import Blog from "./Components/BlogCreation";
import AllEvents from "./Components/Event/AllEvents";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Jobs from "./Components/Jobs";
import News from "./Components/News";
import AllBlogs from "./Components/AllBlogs";
import SingleBlog from "./Components/SingleBlog";
import SingleJob from "./Components/SingleJob";
import CreateJob from "./Components/CreateJob";
import Profile from "./Components/Profile";

function App() {
  const route = createBrowserRouter([
    {
      path: "/signup",
      element: <Resistration />
    },
    {
      path: "/signin",
      element: <Login />
    },
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/alumni-directory",
      element: <AlumniDirectory />
    },
    {
      path: "/events/:eventName",
      element: <EventDetails />
    },
    {
      path: "/blog/:postId/:title",
      element: <SingleBlog />
    },
    {
      path: "/jobs/job-post/:postId",
      element: <SingleJob />
    },
    {
      path: "/blogs/page/:pageNumber",
      element: <AllBlogs />
    },
    {
      path: "/jobs",
      element: <Jobs />
    },
    {
      path: "/news",
      element: <News />
    },
    {
      path: "/events",
      element: <AllEvents />
    },
    {
      path: "/create-blog",
      element: <Blog />
    },
    {
      path: "/jobs/add-job",
      element: <CreateJob />
    },
    {
      path: "/profile",
      element: <Profile />
    }
  ])
  return (
    <div>
      <ToastContainer position="bottom-center" autoClose={1000} />
      <RouterProvider router={route} />
    </div>
  );
}

export default App;
