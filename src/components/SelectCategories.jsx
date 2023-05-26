import API_URL from "../services/apiConfig";
import { useState, useEffect } from "react";
import axios from "axios";

// MUI Imports
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Select from "@mui/material/Select";

// --- End of imports

const storedToken = localStorage.getItem("authToken");

const SelectCategories = ({ categoryArray, setCategoryArray }) => {
  const [allCategories, setAllCategories] = useState([]);

  // -------------------------------------------------------
  // FETCH CATEGORIES FROM BACKEND
  // -------------------------------------------------------

  useEffect(() => {
    axios
      .get(`${API_URL}/categories`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        const categories = [...res.data.categories];
        const categoriesArray = categories.map((category) => {
          return category.category;
        });

        categoriesArray.sort();

        setAllCategories(categoriesArray);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setCategoryArray(e.target.value);
  };

  // -------------------------------------------------------
  // RENDER
  // -------------------------------------------------------

  return (
    <FormControl>
      <InputLabel id="select-categories">Choose</InputLabel>
      <Select
        name="categoryArray"
        labelId="select-categories"
        id="categoryArray"
        multiple
        value={categoryArray}
        onChange={handleSelectChange}
        input={<OutlinedInput label="Catego" />}
        renderValue={(selected) => selected.join(", ")}
        MenuProps={{
          // Styling of dropdown window
          PaperProps: {
            style: {
              maxHeight: 500,
            },
          },
          // Styling of the menu items
          MenuListProps: {
            style: {
              padding: "0 !important",
            },
          },
        }}
      >
        {allCategories.map((cat) => (
          <MenuItem key={cat} value={cat}>
            <Checkbox
              checked={categoryArray.indexOf(cat) > -1}
              onChange={handleSelectChange}
            />
            <ListItemText primary={cat} />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectCategories;
