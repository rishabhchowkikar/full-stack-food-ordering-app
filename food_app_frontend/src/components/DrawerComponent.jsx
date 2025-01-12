import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import InputLabel from "@mui/material/InputLabel";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import { FiCheckCircle } from "react-icons/fi";
import { FaBan } from "react-icons/fa";
import { axiosInstance } from "../lib/axios.js";

const DrawerComponent = ({ toggleDrawer }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: 0,
    category: "",
    available: true,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) || 0 : value,
    });
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.price) newErrors.price = "Price is required";
    if (!formData.category) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (validateForm()) {
      console.log("Form submitted:", formData);

      try {
        const response = await axiosInstance.post(
          "/menu/add-menu-item",
          formData
        );
        console.log(`response data: ${response.data}`);
      } catch (error) {
        console.log(`error in DrawerComponent: ${error}`);
      }
    }
  };

  const handleCancel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    toggleDrawer(false)(event);
  };

  const CustomLabel = ({ icon: Icon, text, color }) => (
    <div className="flex items-center gap-2">
      <Icon className={`size-6 text-${color ? color : "gray"}-500`} />
      <span className="text-lg">{text}</span>
    </div>
  );

  return (
    <Box
      sx={{
        width: 500,
        p: 3,
      }}
      role="presentation"
      onClick={(e) => e.stopPropagation()}
    >
      <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 4 }}>
        Add Menu Item
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            color="success"
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
          />

          <TextField
            color="success"
            fullWidth
            label="Price"
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            error={!!errors.price}
            helperText={errors.price}
            required
          />

          <FormControl
            color="success"
            fullWidth
            required
            error={!!errors.category}
          >
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category || "notSelected"}
              label="Category"
              name="category"
              onChange={handleChange}
            >
              <MenuItem value="notSelected" disabled>
                Not Selected
              </MenuItem>
              <MenuItem value="Appetizers">Appetizer</MenuItem>
              <MenuItem value="Main Course">Main Course</MenuItem>
              <MenuItem value="Desserts">Dessert</MenuItem>
              <MenuItem value="Beverages">Beverage</MenuItem>
              <MenuItem value="Salads">Salads</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
              <MenuItem value="Kids Menu">Kid's Menu</MenuItem>
              <MenuItem value="Chef’s Specials">Chef's Special</MenuItem>
            </Select>
          </FormControl>

          <FormControl color="success" component="fieldset">
            <FormLabel component="legend">Availability Status</FormLabel>
            <RadioGroup
              row
              name="available"
              value={formData.available}
              onChange={handleChange}
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

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={handleCancel} color="error">
              Cancel
            </Button>
            <Button variant="contained" type="submit" color="success">
              Submit
            </Button>
          </Stack>
        </Stack>
      </form>
    </Box>
  );
};

export default DrawerComponent;
