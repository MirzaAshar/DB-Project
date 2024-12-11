import { axiosService } from "./Helper";

export const signIn = async (userData) => {
  return axiosService
    .post("/api/auth/login", userData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);
};

export const signUp = async (userData) => {
  return axiosService
    .post("/api/auth/register", userData, {
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.data);
};

export const createBlog = async (postDto, userId, categoryId) => {
  return axiosService
    .post(`/api/user/${userId}/category/${categoryId}/posts`, postDto, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => response.data);
};

export const getAllCategories = async () => {
  return axiosService.get("/api/categories/").then((response) => response.data);
};

export const getUserById = async (userId) => {
  return axiosService
    .get(`/api/users/${userId}`)
    .then((response) => response.data);
};

export const updateUser = (userId, userData) => {
  return axiosService
    .put(`/api/users/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.data);
}

export const getAllPosts = (
  pageNumber = 0,
  pageSize = 10,
  sortBy = "postId"
) => {
  return axiosService
    .get("/api/posts", {
      params: {
        pageNumber,
        pageSize,
        sortBy,
      },
    })
    .then((response) => response.data);
};

export const getAllJobs = () => {
  return axiosService
    .get("/api/jobs/jobPosts")
    .then((response) => response.data);
};

export const getBlogById = (postId) => {
  return axiosService
    .get(`/api/posts/${postId}`)
    .then((response) => response.data);
};

export const fetchImage = (imageName) => {
  return axiosService
    .get(`${imageName}`, {
      responseType: "blob",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((response) => response.data);
};

export const addComment = (comment, postId, userId) => {
  return axiosService
    .post(
      `/api/comments/post/${postId}/user/${userId}/comments`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      }
    )
    .then((response) => response.data);
};

export const getJobById = async (jobId) => {
  return axiosService
    .get(`/api/jobs/jobPost/${jobId}`)
    .then((response) => response.data);
}

export const getTotalPosts = async () => {
  return axiosService.get("/api/posts/count").then((response) => response.data);
}

export const getAllNews = () => {
  return axiosService.get("/api/news/").then((response) => response.data);
}

export const getPostsByUser = (userId) => {
  return axiosService.get(`/api/user/${userId}/posts`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((response) => response.data);
}