import * as React from "react";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import API_URL from "../../services/apiConfig";
import axios from "axios";

const storedToken = localStorage.getItem("authToken");

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export default function SearchBar() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [allUserNames, setAllUserNames] = React.useState([]);
  const [allCollectionNames, setAllCollectionNames] = React.useState([]);
  const [allItemNames, setAllItemNames] = React.useState([]);
  const loading = open && options.length === 0;

  //  Autosubmit the selected option and call the search route: /search?q={title from the dropdown}.
  const handleSelectOption = (event, value) => {
    setSelectedOption(value);

    if (value.title === "Create Item") {
      navigate("/create-item", { state: { fromSearch: true } });
    } else if (value.title === "Create Collection") {
      window.location.href = "/create-collection";
    } else if (value.title === "Search...") {
      const searchParams = new URLSearchParams({ q: value.title });
      const url = `/search?${searchParams.toString()}`;
      window.location.href = url;
    } else if (options.length === 0 && value.inputValue !== "") {
      let searchTitle = value.title;
      searchTitle = value.inputValue;
      const searchParams = new URLSearchParams({ q: searchTitle });
      const url = `/search?${searchParams.toString()}`;
      window.location.href = url;
    } else {
      const searchParams = new URLSearchParams({ q: value.title });
      const url = `/search?${searchParams.toString()}`;
      window.location.href = url;
    }
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
        const sortedOptions = [
          ...allUserNames.map((username) => ({
            title: username,
            type: "user",
          })),
          ...allCollectionNames.map((name) => ({
            title: name,
            type: "collection",
          })),
          ...allItemNames.map((name) => ({ title: name, type: "item" })),
        ].sort((a, b) => {
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
          }
          return a.title.localeCompare(b.title);
        });

        setOptions(sortedOptions);
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
      .get(`${API_URL}/users`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((res) => {
        setAllUserNames(res.data.map((user) => user.username));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/collections`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
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

  return (
    <nav
      id="back-to-top-anchor"
      className="bg-slate-400 shadow-sm"
      style={{ zIndex: 10 }}
    >
      <div id="search-bar" className="px-4 pt-3 pb-4 top-0">
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
          isOptionEqualToValue={(option, value) => option.title === value.title}
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
              return [
                { title: "Create Item" },
                { title: "Create Collection" },
                { title: "Search..." },
              ];
            }

            return filteredOptions;
          }}
          // Styles and content of input field
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
          renderOption={(props, option) => (
            <li {...props}>
              {option.type === "user" &&
                allUserNames.includes(option.title) && (
                  <span className="text-orange-500 uppercase">
                    User &nbsp;&nbsp;&nbsp;
                  </span>
                )}
              {option.type === "collection" && (
                <span className="text-slate-500 uppercase">
                  Collection &nbsp;&nbsp;&nbsp;
                </span>
              )}
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
      </div>
    </nav>
  );
}
