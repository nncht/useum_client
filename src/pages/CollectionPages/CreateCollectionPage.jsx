import CreateCollectionForm from "../../components/Collections/CreateCollectionForm";

function CollectionsPage() {
  return (
    <div id="main-content">
      <div id="main-section" className="justify-center p-4">
        <div className="p-4 bg-slate-50 rounded-md">
          <CreateCollectionForm
            target={"collections"}
            idObject={"collection"}
          />
        </div>
      </div>
    </div>
  );
}

export default CollectionsPage;
