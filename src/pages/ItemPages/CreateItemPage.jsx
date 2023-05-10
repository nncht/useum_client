import CreateItemForm from "../../components/CreateItemForm";
import ItemList from "../../components/ItemList";
import CreateForm from "../../components/CreateForm";
import { getCollectionId } from "../../services/sharedDatastore";

function CreateItemPage() {
  const collectionId = getCollectionId();
  console.log("CollectionID", collectionId);

  return (
    <section id="main-content" className="px-3 pt-3 pb-20 bg-slate-300">
      <CreateForm
        target={"items"}
        idObject={"item"}
        className="w-50"
        forCollection={collectionId}
      />
    </section>
  );
}

export default CreateItemPage;
