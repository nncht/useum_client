import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CreateForm from "../../components/CreateForm";
import axios from "axios";
import API_URL from "../../services/apiConfig";

function CollectionsPage() {
  const [selectedCollection, setSelectedCollection] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCreateItem = async (name, description) => {
    try {
      const response = await fetch(`${API_URL}/items`, {
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
      <div id="main-section" className="justify-center">
        <CreateForm target={"collections"} idObject={"collection"} />
      </div>

      {successMessage && <p>{successMessage}</p>}
    </div>
  );
}

export default CollectionsPage;
