import axios from "axios";

export const axiosWithAuth = () => {
  const token = localStorage.getItem("token");

  return axios.create({
    baseURL: "forumbusters.us-west-2.elasticbeanstalk.com/api/users",
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`
    }
  });
};
