import axios from "axios";
import { toast } from "react-toastify";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createPoll=async(pollData)=>{
    try {
        const response=await api.post('/polls',pollData)
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export const submitVote=async(pollId,voteData)=>{
    try {
        const response =await api.post(`polls/${pollId}/vote`,voteData)
        return response.data
    } catch (error) {
        toast.error(error.message)
        throw error
    }
}

export default api
