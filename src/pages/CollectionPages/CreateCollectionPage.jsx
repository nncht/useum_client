import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateForm from "../../components/CreateForm";
import axios from "axios";

function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateItem = async (name, description) => {
    try {
      const response = await fetch("http://localhost:5005/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          collection: selectedCollection,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSuccessMessage(`Item "${name}" created successfully!`);
    } catch (error) {
      console.error("Error creating item:", error);
    }
  };

  return (
    <div id="main-content">
      <h1>Collections</h1>
      <div className="flex justify-center">
      <div className="bg-white p-4 mt-5 rounded-lg mx-auto" id="login-box">
        <h2>Create Collection</h2>
        <CreateForm target={"collections"} idObject={"collection"}/>


        </div>
      </div>
      {/* {selectedCollection ? (
        <div>
          <h2>Create Item for Collection {selectedCollection}</h2>
          <CreateItemForm onCreateItem={handleCreateItem} />
        </div>
      ) : (
        <p>Please select a collection to create items for.</p>
      )} */}
      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CollectionsPage;
