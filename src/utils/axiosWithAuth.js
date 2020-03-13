import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "https://thawing-beach-40787.herokuapp.com/api/users",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
};
