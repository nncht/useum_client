import { useState, useRef, useMemo } from "react";
import { Button } from "@mui/material";

const SearchBar = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef();

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.toLowerCase().includes(query.toLowerCase());
    });
  }, [items, query]);

  function onSubmit(e) {
    e.preventDefault();

    const value = inputRef.current.value;
    if (value === "") return;
    setItems((prev) => {
      return [...prev, value];
    });

    inputRef.current.value = "";
  }

  return (
    <div id="search-bar" className="p-4 bg-slate-500 sticky shadow top-0">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        type="search"
        list="items"
        style={{ width: "100%" }}
        className="sticky"
      />
      <datalist id="items" style={{ width: "100%" }}>
        {filteredItems.map((item, index) => (
          <option key={index} value={item} />
        ))}
      </datalist>
      <br />
      <br />
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" />
        <button type="submit" className="m-2">
          Add
        </button>
      </form>

      {filteredItems.map((item) => (
        <div>{item}</div>
      ))}
    </div>
  );
};

export default SearchBar;
