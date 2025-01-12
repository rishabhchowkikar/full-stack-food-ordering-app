import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import { FiCheckCircle } from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-hot-toast";
import CircularProgress from "@mui/material/CircularProgress";

const categories = [
  "Main Course",
  "Appetizers",
  "Desserts",
  "Beverages",
  "Salads",
  "Snacks",
  "Kids Menu",
  "Chef’s Specials",
];

const UpdateMenuItem = ({ menuData, onClose }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    price: 0,
    category: "",
    availability: true,
  });

  useEffect(() => {
    if (menuData) {
      setFormData(menuData);
    }
  }, [menuData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    }));
  };

  const handleAvailabilityChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      availability: e.target.value === "true",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsUpdating(true);
      const updatedData = {
        price: formData.price,
        availability: formData.availability,
      };
      const response = await axiosInstance.put(
        `/menu/update-menu-item/${formData._id}`,
        updatedData
      );

      setIsUpdating(false);
      toast.success("Menu Item Updated successfully");
    } catch (error) {
      toast.error("Error while Updating Item");
      console.log(`error in the updateMenuItem function: ${error}`);
      onClose();
    }
    onClose();
  };

  const CustomLabel = ({ icon: Icon, text, color }) => (
    <div className="flex items-center gap-2">
      <Icon className={`size-6 text-${color ? color : "gray"}-500`} />
      <span className="text-lg">{text}</span>
    </div>
  );
  return (
    <Box className="w-[500px] p-6">
      <div className="flex justify-between items-center mb-6">
        <Typography variant="h5" className="font-bold">
          Update Menu Item
        </Typography>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          disabled
        />

        <TextField
          fullWidth
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <TextField
          fullWidth
          select
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          disabled
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>
              {category}
            </MenuItem>
          ))}
        </TextField>

        <FormControl component="fieldset">
          <FormLabel>Availability Status</FormLabel>
          <RadioGroup
            row
            name="availability"
            value={formData.availability.toString()}
            onChange={handleAvailabilityChange}
          >
            <FormControlLabel
              value="true"
              control={<Radio />}
              label={
                <CustomLabel
                  icon={FiCheckCircle}
                  text="Available"
                  color="green"
                />
              }
            />
            <FormControlLabel
              value="false"
              control={<Radio />}
              label={
                <CustomLabel icon={FaBan} text="Not Available" color="red" />
              }
            />
          </RadioGroup>
        </FormControl>

        <div className="flex justify-end gap-4">
          <Button
            variant="outlined"
            onClick={onClose}
            className="capitalize"
            color="error"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            className="capitalize"
            color="success"
            startIcon={
              isUpdating ? (
                <CircularProgress color="secondary" size="15px" />
              ) : (
                ""
              )
            }
            disabled={isUpdating}
          >
            Update Item
          </Button>
        </div>
      </form>
    </Box>
  );
};

export default UpdateMenuItem;
