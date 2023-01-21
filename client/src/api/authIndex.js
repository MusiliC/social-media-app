import axios from "axios";

const url = "http://localhost:5000/users";

axios.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }

  return req;
});

export const fetchPosts = () => axios.get(url);

export const signIn = (formData) => axios.post(`${url}/signin`, formData);
export const signUp = (formData) => axios.post(`${url}/signup`, formData);
