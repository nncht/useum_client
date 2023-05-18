import CreateItemForm from "../../components/Items/CreateItemForm";
import { getCollectionId } from "../../services/sharedDatastore";
import CreateItemSearch from "../../components/Items/CreateItemSearch.jsx";
import SectionHeader from "../../components/UI/SectionHeader";

function CreateItemPage() {
  // const collectionId = getCollectionId();
  // console.log("CollectionID", collectionId);

  return (
    <div id="main-content">
      <div id="main-section" className="justify-center p-4">
        <div className="p-4 bg-slate-50 rounded-md">
          <SectionHeader title="Create new item"></SectionHeader>
          <div className="pb-10">
            <CreateItemSearch />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateItemPage;
