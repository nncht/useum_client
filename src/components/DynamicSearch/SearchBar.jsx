import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import { useEffect } from "react";
import API_URL from "../../services/apiConfig";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBar() {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [allUserNames, setAllUserNames] = React.useState([]);
  const [allCollectionNames, setAllCollectionNames] = React.useState([]);
  const [allItemNames, setAllItemNames] = React.useState([]);
  const loading = open && options.length === 0;

  //   Attempt to autosubmit the selected option and call the search route: /search?q={title from the dropdown}.
  // const handleSelectOption = (event, value) => {
  //   setSelectedOption(value);
  // };

  const handleSelectOption = (event, value) => {
    setSelectedOption(value);
    const searchParams = new URLSearchParams({ q: value.title });
    const url = `/search?${searchParams.toString()}`;
    window.location.href = url;
  };

  // const handleKeyPress = (event) => {
  //   if (event.key === "Enter" && selectedOption !== null) {
  //     const searchParams = new URLSearchParams({ q: selectedOption.title });
  //     const url = `/search?${searchParams.toString()}`;
  //     window.location.href = url;
  //   }
  // };

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
          ...allUserNames.map((username) => ({
            title: username,
            type: "user",
          })),
          ...allCollectionNames.map((name) => ({
            title: name,
            type: "collection",
          })),
          ...allItemNames.map((name) => ({ title: name, type: "item" })),
        ]);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading, allUserNames, allCollectionNames, allItemNames]);

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  useEffect(() => {
    axios
      .get(`${API_URL}/users`)
      .then((res) => {
        setAllUserNames(res.data.map((user) => user.username));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/collections`)
      .then((res) => {
        setAllCollectionNames(
          res.data.collections.map((collection) => collection.name)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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

  return (
    <nav className="bg-slate-400 shadow-sm" style={{ zIndex: 10 }}>
      <div id="search-bar" className="px-4 pt-3 pb-4 top-0">
        <Autocomplete
          id="search-input"
          onChange={handleSelectOption}
          sx={{ width: "100%", background: "white", borderRadius: "0.25rem" }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) => option.title === value.title}
          getOptionLabel={(option) => option.title}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              placeholder="Search for collections, items or users..."
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
        />
        {/* <Button variant="contained">
          <SearchIcon />
        </Button> */}
      </div>
    </nav>
  );
}
