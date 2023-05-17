import { useState } from "react";
import SearchBar from "../../components/DynamicSearch/SearchBar";
import CreateItemForm from "../../components/Items/CreateItemForm";
import { getCollectionId } from "../../services/sharedDatastore";

function CreateItemPage() {
  const [showForm, setShowForm] = useState(false);
  const collectionId = getCollectionId();
  console.log("CollectionID", collectionId);

  const handleSearchSubmit = (searchQuery) => {
    // erform search logic here based on the searchQuery
    // If the search is successful, you can show the form
    <SearchBar />;
    setShowForm(true);
  };

  return (
    <div id="main-content">
      <div id="main-section" className="justify-center p-4">
        {showForm ? (
          <div className="p-4 bg-slate-50 rounded-md">
            <CreateItemForm
              target={"items"}
              idObject={"item"}
              className="w-50"
              forCollection={collectionId}
            />
          </div>
        ) : (
          <SearchBar onSubmit={handleSearchSubmit} />
        )}
      </div>
    </div>
  );
}

export default CreateItemPage;
