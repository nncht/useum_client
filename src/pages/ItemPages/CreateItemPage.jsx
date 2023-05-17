import CreateItemForm from "../../components/CreateItemForm";
import { getCollectionId } from "../../services/sharedDatastore";

function CreateItemPage() {
  const collectionId = getCollectionId();
  console.log("CollectionID", collectionId);

  return (
    <div id="main-content">
      <div id="main-section" className="justify-center p-4">
        <div className="p-4 bg-slate-50 rounded-md">
          <CreateItemForm
            target={"items"}
            idObject={"item"}
            className="w-50"
            forCollection={collectionId}
          />
        </div>
      </div>
    </div>
  );
}

export default CreateItemPage;
