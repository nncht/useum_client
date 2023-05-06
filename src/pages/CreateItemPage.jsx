import CreateItemForm from '../components/CreateItemForm';
import ItemList from '../components/ItemList';

function CreateItemPage() {
  return (
    <div>
      <h1>Create Item</h1>
      <CreateItemForm />
      <ItemList />
    </div>
  );
}

export default CreateItemPage;