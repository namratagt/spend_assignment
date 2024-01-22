import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveItemDetails } from "../stores/actions";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import { Link, Navigate } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const infoMap = {
  name: "Name",
  description: "Description",
  category: "Category",
  quantity: "Quantity",
  unitPrice: "Unit Price",
  manufacturer: "Manufacturer",
  weight: "Weight",
  storageLocation: "Storage Location",
  room: "Room",
  shelf: "Shelf",
  image: "Image",
};

const ReviewAndConfirmation = () => {
  const dispatch = useDispatch();
  const itemDetails = useSelector((state) => state.itemDetails);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(saveItemDetails({ [name]: value }));
  };

  const baseUrl = "https://inquisitive-coveralls-moth.cyclic.app/";

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);
      e.preventDefault();

      const formData = new FormData();
      Object.entries(itemDetails).forEach(([key, value]) => {
        // Exclude image if key is 'image'
        if (key !== "image") {
          formData.append(key, value);
        }
      });

      const response = await axios.post(`${baseUrl}api/submit`, formData);

      // Check if the response status is in the range 200-299
      if (response.status >= 200 && response.status < 300) {
        // API call was successful
        console.log("Data submitted successfully");
        toast.success("Successfully submitted!");
      } else {
        // API call failed
        const errorText = response.data?.error || "Unknown error";
        console.error(
          `Error submitting data to the API. Status: ${response.status}, Response: ${errorText}`
        );
        toast.error(`Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="container">
        <Toaster />
        <nav>
          <Link to="/">
            <Button variant="contained" sx={{ backgroundColor: "black" }}>
              Home
            </Button>
          </Link>
        </nav>
        <h4> Review And Confirmation</h4>
        {Object.keys(itemDetails).map((key) => (
          <div
            key={key}
            style={{ display: "flex", flexDirection: "row", gap: "1%" }}
          >
            <span style={{ width: "50%" }}>{infoMap[key]}</span>
            <div style={{ width: "50%" }}>
              <TextField
                disabled
                fullWidth
                size="small"
                value={itemDetails[key]}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="button-grp">
        <Button variant="contained" sx={{ backgroundColor: "black" }}>
          <Link to="/itemImages">
            <NavigateBeforeIcon fontSize="large" to />
          </Link>
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "black" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </>
  );
};

export default ReviewAndConfirmation;
