import axios from "axios";
export const axiosWithAuth = () => axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `http://localhost:9000/api` : `https://expense-tracker-be-a.herokuapp.com/api`,
  headers: {
    authorization: localStorage.getItem('token')
  }
});