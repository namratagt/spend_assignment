import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveItemDetails } from "../stores/actions";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";
const ItemLocation = () => {
  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const [validation, setValidation] = useState({
    storageLocation: false,
    room: false,
  });

  useEffect(() => {
    setValidation({
      storageLocation: itemDetails.storageLocation !== "",
      room: itemDetails.room !== "",
    });
  }, [itemDetails]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveItemDetails({ [name]: value }));
  };
  const isFormValid = Object.values(validation).every((isValid) => isValid);

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
        <h4> Item Location</h4>

        <TextField
          fullWidth
          required
          id="standard-basic"
          label="Storage Location"
          variant="standard"
          name="storageLocation"
          value={itemDetails.storageLocation}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          required
          id="standard-basic"
          label="Room"
          variant="standard"
          name="room"
          value={itemDetails.room}
          onChange={handleChange}
        />

        <TextField
          fullWidth
          name="shelf"
          id="standard-number"
          label="Shelf"
          type="number"
          variant="standard"
          value={saveItemDetails.shelf}
          onChange={handleChange}
        />
      </div>
      <div className="button-grp">
        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          <Link to="/itemSpecification">
            <NavigateBeforeIcon fontSize="large" />
          </Link>
        </Button>

        <Button
          disabled={!isFormValid}
          variant="contained"
          sx={{ backgroundColor: "black" }}
          LinkComponent="/itemImages"
        >
          <Link to="/itemImages">
            {" "}
            <NavigateNextIcon fontSize="large" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ItemLocation;
