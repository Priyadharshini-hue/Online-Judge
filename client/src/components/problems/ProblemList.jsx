import React, { useEffect, useState } from "react";
import { Container, Table, Button, Dropdown, Pagination, Badge, Spinner } from "react-bootstrap";
import axios from "axios";

const PromblemList = () => {
  const [problem, setProblem] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [problemsPerPage] = useState(7); // If 5 => 20 pages

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const res = await axios.get("/getProblems");
      setProblem(res.data);

      setLoading(false);
    };
    fetchData();
  }, []);

  const indexOfLastProblem = currentPage * problemsPerPage;
  const indexOfFirstProblem = indexOfLastProblem - problemsPerPage;
  const currentProblems = problem.slice(indexOfFirstProblem, indexOfLastProblem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDelete = () => {
    // Add your logic for the "Delete" action here
    console.log('Delete button clicked');
  };

  const maxPagesInRow = 10;
  const totalPages = Math.ceil(problem.length / problemsPerPage);

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
          <Spinner animation="border" variant="dark" /> Loading....
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
                  <tr key={problem.id}>
                    <td className="d-flex justify-content-between align-items-center">{problem.problemTitle}
                      <Badge pill bg="dark">hard</Badge>
                      <Dropdown>
                        <Dropdown.Toggle className="  p-1" variant='outline-dark' >
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item href="/addProblem">Edit</Dropdown.Item>
                          <Dropdown.Item onClick={handleDelete}>Delete</Dropdown.Item>
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
            <Button variant="outline-dark" href="/addProblem">Add Problem</Button>
          </div>
        </div>
      )}
    </Container>

  );
};

export default PromblemList;
