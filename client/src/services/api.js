import axios from "axios";
import { BACK_SERVER_URL } from "../config/config";

export const createProblem = async (problemData, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.post(
      `${BACK_SERVER_URL}/problems/add`,
      problemData,
      { headers }
    );
    return response;
  } catch (error) {
    return error;
  }
};

export const getProblem = async (problemId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BACK_SERVER_URL}/problems/${problemId}`,
      { headers }
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
