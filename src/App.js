import "./App.css";

import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import ItemInfo from "./components/ItemInfo";
import ItemSpec from "./components/ItemSpec";
import ItemLocation from "./components/ItemLocation";
import ItemImages from "./components/ItemImages";
import ReviewAndConfirmation from "./components/ReviewAndConfirmation";
import { Provider } from "react-redux";
import store from "./stores/stores";
import Home from "./components/Home";
import SingleItem from "./components/SingleItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";

function App() {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    // Fetch inventory data from your API endpoint
    const baseUrl = "https://inquisitive-coveralls-moth.cyclic.app/";
    // const baseUrl = "http://localhost:8000/";
    // const baseUrl = " https://spndback.onrender.com/";
    axios
      .get(`${baseUrl}api/inventory`)
      .then((response) => {
        // Axios automatically parses the response as JSON
        const data = response.data;
        setInventoryList(data);
      })
      .catch((error) => console.error("Error fetching inventory:", error));
  }, []);
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  inventoryList={inventoryList}
                  setInventoryList={setInventoryList}
                />
              }
            />
            <Route path="/info" element={<ItemInfo />} />
            <Route path="/itemSpecification" element={<ItemSpec />} />
            <Route path="/itemLocation" element={<ItemLocation />} />
            <Route path="/itemImages" element={<ItemImages />} />
            <Route
              path="/ReviewandConfirmation"
              element={<ReviewAndConfirmation />}
            />
            <Route
              path="/singleItem/:_id"
              element={<SingleItem inventoryList={inventoryList} />}
            />
          </Routes>
        </BrowserRouter>
      </Provider>
    </div>
  );
}

export default App;
