import CreateItemForm from "../../components/CreateItemForm";
import ItemList from "../../components/ItemList";
import CreateForm from "../../components/CreateForm";
import { getCollectionId } from '../../services/sharedDatastore';


function CreateItemPage() {
  const collectionId = getCollectionId();
  console.log("CollectionID", collectionId);

  return (
    <div id="main-content">
      <h1>Create Item</h1>
      <CreateForm target={"items"} idObject={"item"} forCollection={collectionId}/>

    </div>
  );
}

export default CreateItemPage;
