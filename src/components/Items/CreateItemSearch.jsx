import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import API_URL from "../../services/apiConfig";

// Custom components
import CreateItemForm from "./CreateItemForm";
import ItemCard from "./ItemCard";
import { getCollectionId } from "../../services/sharedDatastore";

// MUI imports
import { Textarea } from "@mui/joy";
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  CircularProgress,
  Autocomplete,
} from "@mui/material";

// --- End of imports

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const CreateItemSearch = () => {
  const collectionId = getCollectionId();
  console.log("CollectionID", collectionId);

  // Handle item search autocomplete component
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [allItemNames, setAllItemNames] = React.useState([]);
  const loading = open && options.length === 0;

  // Handle form display
  const [itemExists, setItemExists] = React.useState(false);
  const [itemDoesntExist, setItemDoesntExist] = React.useState(false);
  const [itemsFound, setItemsFound] = useState([]);

  // Determine itemId from selectedOption
  const [itemId, setItemId] = useState("");
  const [collection, setCollection] = useState(null);

  // Handle modal popup
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  if (itemId) {
    console.log(itemId);
  }

  // Modal styles
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
      // Result: Display create new item form
    } else if (selectedOption) {
      setItemDoesntExist(false);
      setItemExists(true);
      axios
        .get(`${API_URL}/search?search=${selectedOption.title}`)
        .then((res) => {
          setItemsFound(res.data.items);
          console.log(res.data.items);
        })
        .catch((err) => {
          console.log(err);
        });
      // Result: Search for item in DB and display add to existing item options
    } else {
      setItemDoesntExist(false);
      setItemExists(false);
      // Result: Display nothing
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

  //   The code below is from the MUI Asynchronous Autocomplete component
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

  // RENDER FORMS
  return (
    // First, search for existing item in DB
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

      {/* Then, handle form display after search */}
      {itemDoesntExist ? (
        // If the item doesn't exist, a NEW item needs to be CREATED = display CREATE NEW ITEM form
        <div className="mt-10">
          <CreateItemForm target={"items"} idObject={"item"} />
        </div>
      ) : !itemDoesntExist & itemExists ? (
        // Else, display search results and buttons to add item from search results
        <div className="mt-10">
          <Grid container spacing={3}>
            {itemsFound.length ? (
              itemsFound.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item._id}>
                  <ItemCard key={item._id} item={item} />
                  {/* Button triggers a modal that prompts the user to write an optional comment */}
                  <Button onClick={handleOpen}>Add this item</Button>
                  <Dialog
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="Comment"
                    aria-describedby="Write a comment for this item"
                  >
                    <form
                      onSubmit={(event) => {
                        event.preventDefault();
                      }}
                    >
                      <DialogTitle>Write a comment (optional)</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Let the community know your thoughts about this item,
                          e.g. why you're using it, how much you like it, etc.
                        </DialogContentText>

                        <Textarea minRows={2} sx={{ mt: 2 }} />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          type="submit"
                          onClick={() => setCollectionId(collection._id)}
                        >
                          Add item now
                        </Button>
                      </DialogActions>
                    </form>
                  </Dialog>
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
};

export default CreateItemSearch;
