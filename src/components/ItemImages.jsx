import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveItemDetails } from "../stores/actions";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import UploadIcon from "@mui/icons-material/Upload";
import DeleteIcon from "@mui/icons-material/Delete";
const ItemImages = () => {
  const dispatch = useDispatch();
  const itemDetails = useSelector((state) => state.itemDetails);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    // Update the state with the selected file
    dispatch(saveItemDetails({ ...itemDetails, image: file }));
  };
  const handleFileDelete = () => {
    // Dispatch an action to remove the image from the state
    dispatch(saveItemDetails({ ...itemDetails, image: null }));
  };
  return (
    <>
      <div className="container">
        <nav>
          <Link to="/">
            <Button variant="contained" sx={{ backgroundColor: "black" }}>
              Home
            </Button>
          </Link>
        </nav>
        <h4> Item Images</h4>

        {itemDetails.image && <p>Selected File: {itemDetails.image.name}</p>}
        <input
          type="file"
          id="file-input"
          accept="image/*"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <div
          style={{
            display: "flex",
            gap: "30%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="file-input">
            <UploadIcon
              fontSize="large"
              sx={{ cursor: "pointer", padding: "4%" }}
            />
          </label>
          <DeleteIcon
            fontSize="large"
            sx={{ cursor: "pointer", padding: "4%" }}
            onClick={handleFileDelete}
          />
        </div>
      </div>{" "}
      <div className="button-grp">
        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          <Link to="/itemLocation">
            <NavigateBeforeIcon fontSize="large" />
          </Link>
        </Button>
        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          <Link to="/ReviewandConfirmation">
            <NavigateNextIcon fontSize="large" />
          </Link>
        </Button>
      </div>
    </>
  );
};
export default ItemImages;
