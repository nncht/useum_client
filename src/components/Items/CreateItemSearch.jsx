import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../../services/apiConfig";

// Custom components
import CreateItemForm from "./CreateItemForm";
import ItemCard from "./ItemCard";
import AddExistingItemForm from "./AddExistingItemForm";
import AddItemToCollection from "./AddItemToCollection";

// MUI imports
import CircularProgress from "@mui/material/CircularProgress";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { Grid, Button } from "@mui/material";

// --- End of imports

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [allItemNames, setAllItemNames] = React.useState([]);
  const loading = open && options.length === 0;
  const [itemExists, setItemExists] = React.useState(false);
  const [itemDoesntExist, setItemDoesntExist] = React.useState(false);
  const [itemsFound, setItemsFound] = useState([]);
  const [itemId, setItemId] = useState("");

  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  if (itemId) {
    console.log(itemId);
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "0px solid #000",
    boxShadow: 24,
    p: 4,
  };

  //  Autosubmit the selected option and call the search route: /search?q={title from the dropdown}.
  const handleSelectOption = (event, value) => {
    setSelectedOption(value);
  };

  useEffect(() => {
    if (
      selectedOption &&
      selectedOption.title === "No match? Add a new item to the database ✍️"
    ) {
      setItemDoesntExist(true);
      setItemExists(false);
    } else if (selectedOption) {
      setItemDoesntExist(false);
      setItemExists(true);
      // Search for item in DB
      axios
        .get(`${API_URL}/search?search=${selectedOption.title}`)
        .then((res) => {
          setItemsFound(res.data.items);
          console.log(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setItemDoesntExist(false);
      setItemExists(false);
    }
  }, [selectedOption]);

  // Add item from search results to the current collection
  const addSelectedItem = () => {
    axios
      .put(`${API_URL}/collections/${itemId}/add-item`, {
        item: itemId,
        user: user._id,
      })
      .then((res) => {})
      .catch((err) => {
        console.error(err);
      });
  };

  //   This stuff below is from the MUI Asynchronous Autocomplete component
  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      await sleep(1e3);

      if (active) {
        setOptions([
          ...allItemNames.map((name) => ({ title: name, type: "item" })), // On click opens dropdown with all fetched items
        ]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, allItemNames]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  // Fetch all existing item names
  useEffect(() => {
    axios
      .get(`${API_URL}/items`)
      .then((res) => {
        setAllItemNames(res.data.items.map((item) => item.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // RENDER FORMS
  return (
    <div id="search-bar" className="pt-4">
      <Autocomplete
        id="search-input"
        onChange={handleSelectOption} // Autosubmit on selection
        sx={{ width: "100%", background: "white", borderRadius: "0.25rem" }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.title === value?.title}
        getOptionLabel={(option) => option.title}
        options={options}
        loading={loading}
        filterOptions={(options, state) => {
          const filteredOptions = options.filter(
            (option) =>
              option.title
                .toLowerCase()
                .indexOf(state.inputValue.toLowerCase()) !== -1
          );

          if (filteredOptions.length === 0 && state.inputValue !== "") {
            return [{ title: "No match? Add a new item to the database ✍️" }];
          }

          return filteredOptions;
        }}
        // Styles and content of input field
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for an item in our database"
            InputProps={{
              ...params.InputProps,
              style: { paddingBottom: "6px" },
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
        renderOption={(props, option) => (
          <li {...props}>
            {option.type === "item" && (
              <span className="text-slate-700 uppercase">
                {" "}
                Item &nbsp;&nbsp;&nbsp;
              </span>
            )}
            {option.title}
          </li>
        )}
      />

      {itemDoesntExist ? (
        <div className="mt-10">
          <CreateItemForm target={"items"} idObject={"item"} />
        </div>
      ) : !itemDoesntExist & itemExists ? (
        <div className="mt-10">
          <Grid container spacing={3}>
            {itemsFound.length ? (
              itemsFound.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <ItemCard key={item._id} item={item} />
                  {/* <Button onClick={() => setItemId(item._id)}>
                    Add this item
                  </Button> */}
                  <Button onClick={handleOpen}>Add this item</Button>
                  <Modal
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <Typography
                        id="modal-modal-title"
                        variant="button"
                        component="h2"
                      >
                        <p>Write a comment (optional)</p>
                      </Typography>
                      <Button>Add item</Button>
                    </Box>
                  </Modal>
                </Grid>
              ))
            ) : (
              <p>No items found</p>
            )}
          </Grid>
        </div>
      ) : (
        <div></div> // Display no form at the start
      )}
    </div>
  );
}
