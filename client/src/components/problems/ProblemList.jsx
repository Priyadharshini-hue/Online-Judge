import React, { useEffect, useState } from "react";
import { Container, Table, Button, Dropdown, Pagination, Badge, Spinner, Modal } from "react-bootstrap";
import axios from "axios";
import { BACK_SERVER_URL } from "../../config/config";
import { useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";

const ProblemList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(7);
  const [message, setMessage] = useState('');
  const [fetchInterval] = useState(40000);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  const token = sessionStorage.getItem('jwtToken');

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);

      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const res = await axios.get(`${BACK_SERVER_URL}/problems/list`, { headers });
        // console.log(res.data);
        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    fetchPosts();

    const intervalId = setInterval(() => {
      fetchPosts();
    }, fetchInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [fetchInterval, token]);

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = data.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const decoded = jwtDecode(token);
  const userId = decoded._id;
  const navigate = useNavigate();

  const handleDelete = async (problem) => {
    console.log('Delete button clicked');
    // console.log(userId === problem.createdBy);
    // console.log(userId);
    if (userId !== problem.createdBy) {
      setMessage("Unauthorized action. Only the problem owner can delete this.");
      setShow(true);
    } else {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const result = await axios.delete(`${BACK_SERVER_URL}/problems/${problem._id}`,
          { headers });

        if (result.status === 200) {
          setData((prevData) => prevData.filter((item) => item._id !== problem._id));
          console.log("Problem deleted!!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = (problem) => {
    console.log("Edit button is clicked");
    // console.log(userId === problem.createdBy);
    // console.log(userId);
    if (userId !== problem.createdBy) {
      setMessage("Unauthorized action. Only the problem owner can edit this.");
      setShow(true);
    } else {
      navigate(`/problems/edit/${problem._id}`);
    }
  };

  const maxPagesInRow = 10;
  const totalPages = Math.ceil(data.length / problemsPerPage);

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => paginate(i)}
        >
          {i}
        </Pagination.Item>
      );
    }
    return pageNumbers;
  };

  const renderPagination = () => {
    if (totalPages <= maxPagesInRow) {
      return renderPageNumbers();
    } else {
      // console.log(Math.max(currentPage - Math.floor(maxPagesInRow / 2) - 1, 0));
      // console.log (Math.min(currentPage + Math.floor(maxPagesInRow / 2), totalPages)); 
      const pagesToDisplay = renderPageNumbers().slice(
        Math.max(currentPage - Math.floor(maxPagesInRow / 2) - 1, 0),
        Math.min(currentPage + Math.floor(maxPagesInRow / 2), totalPages)
      );

      const firstPage = (
        <>
          <Pagination.First onClick={() => paginate(1)} disabled={currentPage === 1} />
          <Pagination.Prev onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
        </>
      );

      const lastPage = (
        <>
          <Pagination.Next onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
          <Pagination.Last onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
        </>
      );

      return (
        <>
          {firstPage}
          {pagesToDisplay}
          {lastPage}
        </>
      );
    }
  };


  return (
    <Container className="">
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="dark" />
        </div>
      ) : (
        <div className="mt-1">
          <div>
            <Table bordered hover>
              <thead>
                <tr>
                  <th> Problem Title</th>
                </tr>
              </thead>
              <tbody>
                {currentProblems.map((problem) => (
                  <tr key={problem._id}>
                    <td className="d-flex justify-content-between align-items-center">{problem.title}
                      <Badge pill bg="dark">{problem.difficulty}</Badge>
                      <Dropdown>
                        <Dropdown.Toggle className="p-1" variant='outline-dark' >
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item onClick={() => handleEdit(problem)}>Edit</Dropdown.Item>
                          <Dropdown.Item onClick={() => handleDelete(problem)}>Delete</Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-center">
            <Pagination>
              {renderPagination()}
            </Pagination>
          </div>
          <div className="d-flex justify-content-center">
            <Button variant="outline-dark" href="/problems/add">Add Problem</Button>
          </div>
        </div>
      )}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton />
        <Modal.Body className='d-flex '>
          <p>{message}</p>
        </Modal.Body>
      </Modal>
    </Container>

  );
};

export default ProblemList;
