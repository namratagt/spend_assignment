import { Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RefreshIcon from "@mui/icons-material/Refresh";
const Home = ({ inventoryList, setInventoryList }) => {
  const handleRefresh = () => {
    // Fetch inventory data again
    // This will re-run the effect
    const baseUrl = "https://inquisitive-coveralls-moth.cyclic.app/";
    axios
      .get(`${baseUrl}api/inventory`)
      .then((response) => {
        const data = response.data;
        setInventoryList(data);
      })
      .catch((error) => console.error("Error fetching inventory:", error));
  };
  return (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "left",
        fontSize: "1.7rem",
      }}
    >
      <Button
        variant="contained"
        sx={{ backgroundColor: "black" }}
        onClick={handleRefresh}
      >
        <RefreshIcon />
      </Button>
      <h4>Inventory List</h4>
      <ul
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          width: "50%",
        }}
      >
        {inventoryList.map((item) => (
          <Link to={`/singleItem/${item._id}`}>
            <li className="inven-item" key={item._id}>
              {item.name}
            </li>
          </Link>
        ))}
      </ul>
      <div style={{ textAlign: "center" }}>
        <Link to="/info" style={{ textAlign: "center" }}>
          <Button style={{ textAlign: "center" }} variant="contained">
            Add New Item
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
