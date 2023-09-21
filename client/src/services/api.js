import axios from "axios";
import { BACK_SERVER_URL } from "../config/config";

export async function createProblem(problemData, token) {
  try {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    
    const result = await axios.post(
      `${BACK_SERVER_URL}/problems/add`,
      problemData,
      { headers }
    );
    return result;
  } catch (error) {
    console.log(error);
  }
}
