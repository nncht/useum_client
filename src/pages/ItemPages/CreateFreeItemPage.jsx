import CreateForm from "../../components/CreateForm";

function CreateFreeItemPage() {


  return (
    <section id="main-content" className="px-3 pt-3 pb-20 bg-slate-300">
      <CreateForm
        target={"items"}
        idObject={"item"}
        className="w-50"
      />
    </section>
  );
}

export default CreateFreeItemPage;
