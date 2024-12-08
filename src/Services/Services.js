import { axiosService } from "./Helper";

export const signIn = (userData) => {
  return axiosService
    .post("/api/auth/login", userData, { headers: { "Content-Type": "application/json" } })
    .then((response) => response.data);
};

export const signUp = (userData) => {
  return axiosService
    .post("/api/users/", userData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const createBlog = (userId, categoryId, blogData) => {
  return axiosService
    .post(`/api/user/${userId}/category/${categoryId}/posts`, blogData, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
};

export const getAllCategories = () => {
  return axiosService.get("/api/categories/").then((response) => response.data);
}

export const getUserById = (userId) => {
  return axiosService.get(`/api/users/${userId}`).then((response) => response.data);
}

export const getAllPosts = (pageNumber = 0, pageSize = 10, sortBy = "postId") => {
  return axiosService.get("/api/posts", {
    params: {
      pageNumber,
      pageSize,
      sortBy
    }
  }).then((response) => response.data);
}

export const getAllJobs = () => {
  return axiosService.get("/api/jobs/jobPosts").then((response) => response.data);
}

export const getAllNews = () => {
  return axiosService.get("/api/news/").then((response) => response.data);
}

export const getBlogById = (postId) => {
  return axiosService.get(`/api/posts/${postId}`).then((response) => response.data);
}

export const addComment = (comment, postId, userId) => {
  return axiosService
    .post(`/api/comments/post/${postId}/user/${userId}/comments`, {"content" : comment}, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

// export const getEvents = () => {
//   return axiosService.get("/events").then((response) => response.data);
// };

// export const getNews = () => {
//   return axiosService.get("/news").then((response) => response.data);
// };

// export const getAlumni = () => {
//   return axiosService.get("/alumni").then((response) => response.data);
// };