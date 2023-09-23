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

export const getProblemToEdit = async (problemId, token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.get(
      `${BACK_SERVER_URL}/problems/edit/${problemId}`,
      { headers }
    );

    return response.data;
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

export const updateProblem = async (token, problemId, problemData) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    const response = await axios.put(
      `${BACK_SERVER_URL}/problems/edit/${problemId}`,
      problemData,
      { headers }
    );

    return response;
  } catch (error) {
    return error;
  }
};

export const fetchProblems = async (token) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(`${BACK_SERVER_URL}/problems/list`, {
      headers,
    });
    return response.data.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProblem = async (token, problemId) => {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.delete(
      `${BACK_SERVER_URL}/problems/${problemId}`,
      {
        headers,
      }
    );
    return response.status === 200;
  } catch (error) {}
};
