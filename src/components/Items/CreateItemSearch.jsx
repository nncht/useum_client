import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import API_URL from "../../services/apiConfig";
import axios from "axios";

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

  //  Autosubmit the selected option and call the search route: /search?q={title from the dropdown}.
  const handleSelectOption = (event, value) => {
    setSelectedOption(value);

    if (value.title === "No match? Add a new item to the database ⤴") {
      window.location.href = "/create-item";
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
        setOptions([
          ...allItemNames.map((name) => ({ title: name, type: "item" })),
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
            return [{ title: "No match? Add a new item to the database ⤴" }];
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
    </div>
  );
}
