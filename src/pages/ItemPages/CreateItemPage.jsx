import CreateItemForm from "../../components/CreateItemForm";
import ItemList from "../../components/ItemList";
import CreateForm from "../../components/CreateForm";

function CreateItemPage() {
  return (
    <div id="main-content">
      <h1>Create Item</h1>
      <CreateForm target={"items"} idObject={"item"}/>

    </div>
  );
}

export default CreateItemPage;
