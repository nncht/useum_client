import * as React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../../services/apiConfig";
import { useContext } from "react";

// Custom components
import CreateItemForm from "./CreateItemForm";
import ItemCard from "./ItemCard";
import { AuthContext } from "../../context/auth.context";

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

const storedToken = localStorage.getItem("authToken");

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

const CreateItemSearch = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useContext(AuthContext);
  console.log(`User ID: ${user._id}`);

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
  const [comment, setComment] = useState("");

  // Handle modal popup
  const [openModal, setOpenModal] = React.useState(false);

  // When the button "Add this item" is clicked open Comment modal and also set that item's ID as itemId
  const handleOpen = (item) => {
    setItemId(item._id);
    console.log(`itemID set to ${item._id}`);
    setOpenModal(true);
  };

  const handleClose = () => setOpenModal(false);

  // Determine itemId from selectedOption
  const [itemId, setItemId] = useState("");

  // Datermine collectionId from query params (after navigating here from Add Item on MyCollection page)
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let collectionId = searchParams.get("collectionId");

  // This will make sure that we don't send a null value as a prop to the CreateItemForm component

  if (collectionId === null) {
    collectionId = "";
  }

  console.log(`Collection ID: ${collectionId}`);

  //  Search input logic
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
        .get(`${API_URL}/search?search=${selectedOption.title}`, )
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

  // Fetch all existing item names for search bar dropdown
  useEffect(() => {
    axios
      .get(`${API_URL}/items`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setAllItemNames(res.data.items.map((item) => item.name));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Add existing item to this collection
  const handleAddExistingItem = (e) => {
    e.preventDefault();

    axios
      .put(
        `${API_URL}/collections/${collectionId}/add-item`,
        {
          item: itemId,
          user: user._id,
        },

      )
      .then((res) => {
        navigate(`/collections/${collectionId}`, );
      })
      .catch((err) => {
        console.error(err);
      });

    if (comment !== "" && user && user._id) {
      console.log("ITEM ID", itemId);
      axios
        .put(
          `${API_URL}/items/${itemId}/comment`,
          {
            comment: comment,
            currentUserId: user._id,
          },
          {
            headers: { Authorization: `Bearer ${storedToken}` },
          }
        )
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleComment = (e) => {
    setComment(e.target.value);
    console.log(comment);
  };

  //   The code below handles the MUI Asynchronous Autocomplete component behaviour
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
          <CreateItemForm
            target={"items"}
            idObject={"item"}
            forCollection={collectionId}
          />
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
                  <div className="my-3 text-center">
                    <Button
                      variant="contained"
                      onClick={() => handleOpen(item)}
                    >
                      Add this item
                    </Button>
                  </div>
                  <Dialog
                    open={openModal}
                    onClose={handleClose}
                    aria-labelledby="Comment"
                    aria-describedby="Write a comment for this item"
                  >
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                      }}
                    >
                      <DialogTitle>Write a comment (optional)</DialogTitle>
                      <DialogContent>
                        <DialogContentText>
                          Let the community know your thoughts about this item,
                          e.g. why you're using it, how much you like it, etc.
                        </DialogContentText>

                        <Textarea
                          minRows={2}
                          sx={{ mt: 2 }}
                          onChange={handleComment}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button type="submit" onClick={handleAddExistingItem}>
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
