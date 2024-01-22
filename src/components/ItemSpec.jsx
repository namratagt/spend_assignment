import React, { useEffect, useState } from "react";
import { saveItemDetails } from "../stores/actions";
import { useDispatch, useSelector } from "react-redux";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
const ItemSpec = () => {
  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const [validation, setValidation] = useState({
    quantity: false,
    unitPrice: false,
    manufacturer: false,
  });

  useEffect(() => {
    setValidation({
      quantity: itemDetails.quantity !== "",
      unitPrice: itemDetails.unitPrice !== "",
      manufacturer: itemDetails.manufacturer !== "",
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
        <h4> Item Specification</h4>
        <TextField
          fullWidth
          required
          name="quantity"
          id="standard-number"
          label="Quantity"
          type="number"
          variant="standard"
          value={itemDetails.quantity}
          onChange={handleChange}
        />{" "}
        <TextField
          required
          fullWidth
          name="unitPrice"
          id="standard-number"
          label="Unit Price"
          type="number"
          variant="standard"
          value={itemDetails.unitPrice}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="manufacturer"
          id="standard-basic"
          label="Manufacturer"
          variant="standard"
          value={itemDetails.manufacturer}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          name="weight"
          id="standard-number"
          label="Weight"
          type="number"
          variant="standard"
          value={itemDetails.weight}
          onChange={handleChange}
        />
      </div>
      <div className="button-grp">
        <Button
          variant="contained"
          sx={{ backgroundColor: "black", color: "" }}
        >
          <Link to="/">
            <NavigateBeforeIcon fontSize="large" />
          </Link>
        </Button>
        <Button
          disabled={!isFormValid}
          variant="contained"
          sx={{ backgroundColor: "black" }}
          LinkComponent="/itemLocation"
        >
          <Link to="/itemLocation">
            {" "}
            <NavigateNextIcon fontSize="large" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ItemSpec;
