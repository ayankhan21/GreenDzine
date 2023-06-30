import React, { useState, useEffect } from "react";
import "../app.css";

function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`https://reqres.in/api/users?page=${page}`)
      .then((response) => response.json())
      .then((data) => setEmployees(data.data));
  }, [page]);

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const nextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    if (page > 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="main">
      <input
        type="text"
        placeholder="Search by first name"
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="change">
        <button onClick={prevPage}>Previous</button>
        <p>{page}</p>
        <button onClick={nextPage}>Next</button>
      </div>
      {filteredEmployees.length === 0 ? (
        <h1>No data</h1>
      ) : (
        <ul className="list">
          {filteredEmployees.map((employee) => (
            <div className="card" key={employee.id}>
              <p className="id">{employee.id}</p>
              <li className="employee">
                <img src={employee.avatar} alt={employee.first_name} />
              </li>
              <span>{employee.first_name}</span>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmployeeList;
