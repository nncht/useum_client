import { useLocation } from "react-router-dom";
import CreateItemForm from "../../components/Items/CreateItemForm.jsx";
import CreateItemSearch from "../../components/Items/CreateItemSearch.jsx";
import SectionHeader from "../../components/UI/SectionHeader";

function CreateItemPage() {
  const location = useLocation();
  const { fromSearch } = location.state || { fromSearch: false };
  console.log(fromSearch);

  return (
    <div id="main-content">
      <div id="main-section" className="justify-center p-4">
        <div className="p-4 bg-slate-50 rounded-md">
          <SectionHeader title="Add Item"></SectionHeader>
          <div className="pb-10">
            {fromSearch ? <CreateItemForm /> : <CreateItemSearch />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateItemPage;
