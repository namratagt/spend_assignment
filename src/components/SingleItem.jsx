import { Button, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { saveItemDetails } from "../stores/actions";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";

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
const SingleItem = ({ inventoryList }) => {
  const { _id } = useParams();
  const [foundItem, setFoundItem] = useState(
    inventoryList.find((item) => item._id === _id)
  );

  const dispatch = useDispatch();
  const [isDelete, setIsDeleting] = useState(false);
  const itemDetails = useSelector((state) => state.itemDetails);
  const [validation, setValidation] = useState({
    name: false,
    description: false,
    category: false,
    quantity: false,
    unitPrice: false,
    manufacturer: false,
    storageLocation: false,
    room: false,
  });
  useEffect(() => {
    setValidation({
      name: itemDetails.name !== "",
      description: itemDetails.description !== "",
      category: itemDetails.category !== "",
      quantity: itemDetails.quantity !== "",
      unitPrice: itemDetails.unitPrice !== "",
      manufacturer: itemDetails.manufacturer !== "",
      storageLocation: itemDetails.storageLocation !== "",
      room: itemDetails.room !== "",
    });
  }, [itemDetails]);
  // foundItem = inventoryList.find((item) => item._id === _id);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const baseUrl = "https://inquisitive-coveralls-moth.cyclic.app/";

  // const baseUrl = "https://localhost:8000/";
  const [edit, setEdit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update the local state with the modified item details
    const updatedItem = { ...foundItem, [name]: value };
    setFoundItem(updatedItem);
  };

  const handleSubmit = async (e) => {
    try {
      setIsSubmitting(true);

      e.preventDefault();
      const formData = new FormData();
      Object.entries(foundItem).forEach(([key, value]) => {
        if (key !== "image") {
          formData.append(key, value);
        }
      });

      const response = await axios.put(`${baseUrl}api/update/${_id}`, formData);

      if (response.status >= 200 && response.status < 300) {
        console.log("Inventory item updated successfully:", response.data);
        toast.success("Item updated successfully");

        return response.data;
      } else {
        // Handle specific HTTP status codes
        if (response.status === 404) {
          console.warn("Error updating inventory item: Item not found");
          toast.error("Item not found");
        } else {
          console.warn("Error updating inventory item:", response.statusText);
          toast.error("Error updating item");
        }

        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
      return error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (e) => {
    try {
      setIsDeleting(true);

      const response = await axios.delete(`${baseUrl}api/delete/${_id}`);

      if (response.status === 200) {
        console.log("Inventory item deleted successfully");
        toast.success("Item deleted successfully");
        // Redirect to the home page or another appropriate page after successful deletion
        // You can use the `useNavigate` hook or other navigation methods here
        return response.data;
      } else {
        // Handle specific HTTP status codes
        if (response.status === 404) {
          console.warn("Error deleting inventory item: Item not found");
          toast.error("Item not found");
        } else {
          console.warn("Error deleting inventory item:", response.statusText);
          toast.error("Error deleting item");
        }

        return null;
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("An unexpected error occurred");
      return error;
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Toaster />

      {console.log(foundItem)}
      <div className="container">
        <Toaster />
        <h4> {foundItem.name}</h4>
        <nav>
          <Link to="/">
            <Button variant="contained" sx={{ backgroundColor: "black" }}>
              Home
            </Button>
          </Link>
        </nav>
        {Object.keys(foundItem).map(
          (key) =>
            key !== "_id" &&
            key !== "img" &&
            key !== "__v" && (
              <div
                key={key}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  textAlign: "left",
                  justifyContent: "space-between",
                  width: "",
                }}
              >
                <span style={{ width: "30%" }}>{infoMap[key]}</span>
                <div style={{ width: "70%" }}>
                  <TextField
                    disabled={!edit}
                    id="standard-basic"
                    name={key}
                    fullWidth
                    size="small"
                    value={foundItem[key]}
                    onChange={handleChange}
                  />
                </div>
              </div>
            )
        )}
      </div>
      <div className="button-grp">
        <Button
          onClick={() => {
            setEdit(!edit);
          }}
          sx={{ backgroundColor: "black" }}
          variant="contained"
        >
          Edit
        </Button>
        <Button
          disabled={isSubmitting}
          onClick={handleSubmit}
          variant="contained"
          sx={{ backgroundColor: "black" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button
          onClick={handleDelete}
          variant="contained"
          sx={{ backgroundColor: "black" }}
        >
          {isDelete ? "..." : <DeleteIcon />}
        </Button>
      </div>
    </>
  );
};

export default SingleItem;
