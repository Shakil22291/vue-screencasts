import Axios from "axios";
Axios.defaults.withCredentials = true;

export default (options = { baseURL: "http://localhost:8000/api" }) => {
  return Axios.create({
    baseURL: options.baseURL,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
