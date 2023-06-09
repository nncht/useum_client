import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/auth.context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import API_URL from "../../services/apiConfig";

import { Grid, Link, Typography } from "@mui/material/";

const storedToken = localStorage.getItem("authToken");

const AddItemToCollection = ({ itemId }) => {
  const { user } = useContext(AuthContext);

  const [currentUser, setCurrentUser] = useState(user);
  const [collectionId, setCollectionId] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.username) {
      axios
        .get(`${API_URL}/users/${user.username}`, )
        .then((res) => {
          setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [user]);

  const collectionArray = currentUser.collections;

  //create array of all item ids from all of the user's collections to compare to the current item id

  const allItemIdsFromCollections = [];
  if (collectionArray) {
    collectionArray.forEach((collection) => {
      collection.items.forEach((item) => {
        allItemIdsFromCollections.push(item);
      });
    });
  }

  const handleSelectChange = (e) => {
    console.log(e.target.value);
    setCollectionId(e.target.value);
  };

  const handleCollectionChoice = (e) => {
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
        navigate(`/collections/${collectionId}`);
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage(err.response.data.message);
      });
  };

  if (currentUser && collectionArray) {
    return (
      <Grid container spacing={1}>
        <Grid item xs={12} className="mt-2">
          {allItemIdsFromCollections.includes(itemId) ? (
            <Typography variant="button">
              Add item to another collection?
            </Typography>
          ) : (
            <Typography variant="button">Add item to a collection?</Typography> // Testing this, as we can't add items from Search Bar anymore
          )}
        </Grid>
        <Grid item xs={12} className="my-2">
          <FormControl onSubmit={handleCollectionChoice}>
            <InputLabel id="collection-picker">Collection</InputLabel>
            <Select
              labelId="collection-picker"
              id="demo-simple-select"
              value={collectionId}
              label="Collection"
              onChange={handleSelectChange}
            >
              {collectionArray.map((collection) => {
                return (
                  <MenuItem key={collection._id} value={collection._id}>
                    {collection.name}
                  </MenuItem>
                );
              })}
            </Select>
            <Button
              variant="contained"
              type="submit"
              onClick={handleCollectionChoice}
              className="mt-3"
            >
              Add to collection
            </Button>
          </FormControl>
        </Grid>

        {errorMessage && (
          <Typography className="error-message">{errorMessage}</Typography>
        )}
      </Grid>
    );
  }
};

export default AddItemToCollection;
