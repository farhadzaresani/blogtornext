import axios from "axios";

export const getUsersData = async () => {
  const { data } = await axios.get("http://localhost:4000/user/");
  return data;
};
export const getTopUsers = async () => {
  const { data } = await axios.get(`http://localhost:4000/user/top-users`);
  return data;
};
export const getTopBlogs = async () => {
  const { data } = await axios.get(`http://localhost:4000/blog/top-blogs`);
  return data;
};

export const getSingleUserData = async (id) => {
  const { data } = await axios.get(
    `http://localhost:4000/user/singleUser/${id}`
  );
  return data;
};

export const getAllBlogs = async () => {
  const { data } = await axios.get("http://localhost:4000/blog");
  return data;
};

export const getMyBlogs = async (token) => {
  const { data } = await axios.get("http://localhost:4000/blog/my-blogs", {
    headers: { auth: `ut ${token}` },
  });
  return data;
};

// const getUrlForBlog = (id) => {
//   return axios.get(`http://localhost:4000/blog/single-blog/${id}`);
// };

export const getSingleBlogData = async (id) => {
  const data = await axios.get(`http://localhost:4000/blog/single-blog/${id}`);
  return data.data;
};
export const getSingleBlogComments = async (id) => {
  const { data } = await axios.get(
    `http://localhost:4000/comment/by-blog/${id}`
  );
  return data;
};

export const getUserBlogs = async (id) => {
  const data = await axios
    .post("http://localhost:4000/blog/by-user", {
      _id: id,
    })
    .then((res) => {
      return res.data;
    });
  return data;
};
export const getMe = async (token) => {
  const data = await axios
    .post(
      "http://localhost:4000/user/me",
      {},
      { headers: { auth: `ut ${token}` } }
    )
    .then((res) => {
      return res.data;
    });
  return data;
};
