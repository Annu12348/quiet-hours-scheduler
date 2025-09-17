import axios from "axios";

export const instance = axios.create({
  baseURL: "https://quiet-hours-scheduler-12.onrender.com",
});