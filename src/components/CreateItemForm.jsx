import { useState } from "react";
import API_URL from "../services/apiConfig";

function CreateItemForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  //   ----------------
  //   ATTENTION: THIS IS THE OLD CREATE ITEM FORM.
  //   IT'S NOT BEING USED ON THE LIVE APP ANYMORE.
  //   PLEASE USE CreateItemForm.jsx in the /components/Items FOLDER INSTEAD!
  //   ----------------

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Reset form fields and set success status
      setName("");
      setDescription("");
      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <>
      {isSuccess && <p>Item created successfully!</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <button type="submit">Create Item</button>
      </form>
    </>
  );
}

export default CreateItemForm;
