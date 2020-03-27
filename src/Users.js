import React, { useState, useEffect } from "react";
import { Table, Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
const axios = require("axios");
var isEmpty = require("lodash.isempty");

const Users = () => {
  const [tableData, settableData] = useState([]);
  const [finaleTableData, setfinaleTableData] = useState([]);
  const history = useHistory();

  const handleSearch = search => {
    const { value } = search.target;

    if (!isEmpty(value)) {
      const searchAfter = tableData.filter(aa => {
        return aa.name.includes(value.toString().trim());
      });

      setfinaleTableData(searchAfter);
    } else {
      setfinaleTableData(tableData);
    }
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then(res => {
        const { data } = res;
        settableData(data);
        setfinaleTableData(data);
        console.log("DATA", data);
      })
      .catch(err => {
        console.log("Error", err);
      });
  }, []);

  const handleShowClick = data => {
    history.push({
      pathname: "/userDetails",
      userData: data
    });
  };

  return (
    <>
      <Navbar bg="dark">
        <Form inline>
          <FormControl
            type="text"
            placeholder="Search name"
            className=" mr-sm-2"
            onChange={handleSearch}
          />
        </Form>{" "}
      </Navbar>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>

            <th>Company name</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {finaleTableData.map((tdata, index) => {
            return (
              <tr>
                <td>{index + 1}</td>

                <td> {tdata.name}</td>

                <td> {tdata.company.name}</td>
                <td>
                  <Button
                    variant="info"
                    onClick={() => {
                      handleShowClick(tdata);
                    }}
                  >
                    Show Details
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
