import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveItemDetails } from "../stores/actions";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link } from "react-router-dom";
const ItemInfo = () => {
  const dispatch = useDispatch();

  const itemDetails = useSelector((state) => state.itemDetails);
  const [validation, setValidation] = useState({
    name: false,
    description: false,
    category: false,
  });
  useEffect(() => {
    setValidation({
      name: itemDetails.name !== "",
      description: itemDetails.description !== "",
      category: itemDetails.category !== "",
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
        <h4> Item Information</h4>

        <TextField
          fullWidth
          required
          id="standard-basic"
          label="Name"
          variant="standard"
          name="name"
          value={itemDetails.name}
          onChange={handleChange}
        />
        <TextField
          required
          fullWidth
          name="description"
          id="standard-basic"
          label="Description"
          variant="standard"
          value={itemDetails.description}
          onChange={handleChange}
        />
        <FormControl fullWidth required>
          <InputLabel id="demo-simple-select-label">Category</InputLabel>
          <Select
            required
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={itemDetails.category}
            label="Category"
            onChange={handleChange}
            name="category"
            variant="standard"
          >
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div className="button-grp">
        <Link></Link>

        <Button
          variant="contained"
          disabled={!isFormValid}
          LinkComponent="/itemSpecification"
          sx={{ backgroundColor: "black", textAlign: "center" }}
        >
          <Link to="/itemSpecification">
            <NavigateNextIcon fontSize="large" />
          </Link>
        </Button>
      </div>
    </>
  );
};

export default ItemInfo;
