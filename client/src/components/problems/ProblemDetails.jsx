import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BACK_SERVER_URL } from "../../config/config"
import { Badge, Card } from 'react-bootstrap';
import Compiler from "./Compiler";

const ProblemDetails = () => {
  const { problemId } = useParams();
  const [problem, setProblem] = useState({});

  useEffect(() => {
    const fetchProblemDetails = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        console.log(problemId);
        const response = await axios.get(`${BACK_SERVER_URL}/problems/${problemId}`, { headers });
        setProblem(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching problem details: ", error);
      }
    };

    fetchProblemDetails();
  }, [problemId]);

  return (
    <div className="d-flex flex-row ">
      <div className="leftSide w-50 flex-grow-1 text-wrap">
        <Card className=" ">
          <Card.Body>
            <Card.Title>{problem.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted"><Badge bg="dark" >{problem.difficulty}</Badge></Card.Subtitle>
            <Card.Text  >{problem.statement}</Card.Text>
            <Card.Text>Sample Input</Card.Text>
            <Card.Text className="bg-dark text-white ">{problem.sampleInput}</Card.Text>
            <Card.Text>Sample Output</Card.Text>
            <Card.Text className="bg-dark text-white">{problem.sampleOutput}</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="rightSide flex-grow-1 w-50"><Compiler /></div>
    </div >
  );
};

export default ProblemDetails;
